import { getExistingShapes } from "./http";

export type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "text";
      startX: number;
      startY: number;
      font: string;
      content: string;
    };
export type Tool = "rectangle" | "circle" | "text";

export class DrawClass {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: number;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private content = "";
  private font = "50px bold italic Arial ";
  private selectedTool: Tool = "circle";
  socket: WebSocket;
  private hoveredShape: Shape | null = null;
  private hoverTimer: ReturnType<typeof setTimeout> | null = null;
  private tooltipShape: Shape | null = null;

  constructor(canvas: HTMLCanvasElement, roomId: number, sokcet: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = sokcet;
    this.clicked = false;
    this.init();
    this.socketHandler();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("click", this.mouseClickHandler);
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }
  setTool(tool: Tool) {
    this.selectedTool = tool;
  }
  async init() {
    this.resizeCanvas();
    this.existingShapes = await getExistingShapes(
      this.roomId,
      this.existingShapes,
    );
    this.clearFill();
  }
  resizeCanvas = () => {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  };
  mouseDownHandler = (e: any) => {
    const rect = this.canvas.getBoundingClientRect();
    this.clicked = true;
    // To make it uiversal to location of canvas
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  };
  mouseUpHandler = (e: any) => {
    this.clicked = false;
    const rect = this.canvas.getBoundingClientRect();

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = currentX - this.startX;
    const height = currentY - this.startY;
    const selectedTool = this.selectedTool;
    let newShape: Shape = {
      type: "rectangle",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    if (selectedTool === "rectangle") {
      newShape = {
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
      this.existingShapes.push(newShape);
    } else if (selectedTool === "circle") {
      const centerX = this.startX + width / 2;
      const centerY = this.startY + height / 2;
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;

      newShape = {
        type: "circle",
        centerX: centerX,
        centerY: centerY,
        radius: radius,
      };
      this.existingShapes.push(newShape);
    }

    this.socket.send(
      JSON.stringify({
        type: "create-shape",
        shape: newShape,
        roomId: this.roomId,
      }),
    );
  };

  mouseMoveHandler = (e: any) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);

    const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

    const shape = this.getShapeAt(x, y);
    this.handleHover(shape);
    if (this.clicked) {
      const rect = this.canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.clearFill();
      this.ctx.strokeStyle = "rgba(255,255,255)";

      const selectedTool = this.selectedTool;
      if (selectedTool === "rectangle") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const centerX = this.startX + width / 2;
        const centerY = this.startY + height / 2;
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (selectedTool === "text") {
        const content = this.content;
        this.ctx.font = this.font;
        this.ctx.fillText(content, this.startX, this.startY);
      }
    }
  };
  mouseClickHandler = (e: MouseEvent) => {
    if (this.selectedTool !== "text") return;

    const rect = this.canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    const content = prompt("Enter your text:");

    if (!content?.trim()) return;

    const newShape: Shape = {
      type: "text",
      startX,
      startY,
      font: this.font,
      content,
    };

    this.existingShapes.push(newShape);
    this.clearFill();
    this.socket.send(
      JSON.stringify({
        type: "create-shape",
        shape: newShape,
        roomId: this.roomId,
      }),
    );
  };
  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("click", this.mouseClickHandler);
  }
  socketHandler = () => {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "create-shape") {
        this.existingShapes.push(message.shape);
        this.clearFill();
      }
    };
  };
  clearFill = () => {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShapes.map((s) => {
      if (s.type === "rectangle") {
        ctx.strokeStyle = "rgba(255,255,255)";
        ctx.strokeRect(s.x, s.y, s.width, s.height);
      } else if (s.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(s.centerX, s.centerY, s.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (s.type === "text") {
        ctx.font = s.font;
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.fillText(s.content, s.startX, s.startY);
      }
    });
  };
  private getShapeAt(x: number, y: number): Shape | null {
    for (let i = this.existingShapes.length - 1; i >= 0; i--) {
      const shape = this.existingShapes[i];

      if (shape.type === "rectangle") {
        const left = Math.min(shape.x, shape.x + shape.width);
        const right = Math.max(shape.x, shape.x + shape.width);
        const top = Math.min(shape.y, shape.y + shape.height);
        const bottom = Math.max(shape.y, shape.y + shape.height);

        if (x >= left && x <= right && y >= top && y <= bottom) {
          return shape;
        }
      } else if (shape.type === "circle") {
        const distance = Math.hypot(x - shape.centerX, y - shape.centerY);

        if (distance <= shape.radius) {
          return shape;
        }
      } else if (shape.type === "text") {
        const ctx = this.ctx;
        ctx.save();
        ctx.font = shape.font;
        const metrics = ctx.measureText(shape.content);

        const left = shape.startX;
        const right = shape.startX + metrics.width;
        const top = shape.startY;
        const bottom =
          shape.startY +
          metrics.actualBoundingBoxAscent +
          metrics.actualBoundingBoxDescent;

        ctx.restore();

        if (x >= left && x <= right && y >= top && y <= bottom) {
          return shape;
        }
      }
    }

    return null;
  }
  private handleHover(shape: Shape | null) {
    if (shape?.type === this.hoveredShape?.type) return;

    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }

    this.hoveredShape = shape;
    this.tooltipShape = null;

    if (!shape) return;

    this.hoverTimer = setTimeout(() => {
      if (this.hoveredShape?.type === shape.type) {
        this.tooltipShape = shape;

        console.log("Hovered shape:", shape);
        // Show creator and creation time here.
      }
    }, 500);
  }
}
