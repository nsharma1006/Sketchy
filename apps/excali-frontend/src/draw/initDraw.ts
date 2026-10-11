// import axios from "axios";
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";


// export const initDraw = async (
//   canvas: HTMLCanvasElement,
//   roomId: number,
//   socket: WebSocket | null,
// ) => {
//   let existingShapes: ShapeProps[] = [];
//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     return;
//   }
//   if (!socket) {
//     return;
//   }
//   const resizeCanvas = () => {
//     const rect = canvas.getBoundingClientRect();
//     canvas.width = rect.width;
//     canvas.height = rect.height;
//   };

//   resizeCanvas();

//   const oldShapes = await getShapes(roomId);
//   if (oldShapes) {
//     oldShapes.map((o: any) => {
//       existingShapes.push(JSON.parse(o.parameters));
//     });
//   }

//   clearFill(existingShapes, canvas);

  
  
  

    
// };

// const clearFill = (existingShapes: ShapeProps[], canvas: HTMLCanvasElement) => {
//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "rgba(0,0,0)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   existingShapes.map((s) => {
//     if (s.type === "rectangle") {
//       ctx.strokeStyle = "rgba(255,255,255)";
//       ctx.strokeRect(s.x, s.y, s.width, s.height);
//     }
//   });
// };

// const getShapes = async (roomId: number) => {
//   try {
//     console.log(`${BACKEND_URL}/shapes/${roomId}`);
//     const response = await axios.get(`${BACKEND_URL}/shapes/${roomId}`);
//     const data = response.data;
//     console.log(response.data);
//     return data.shapes;
//   } catch (error) {
//     console.log(error);
//   }
// };
