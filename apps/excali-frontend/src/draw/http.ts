import axios from "axios";
import { Shape } from "./DrawClass";

export async function getExistingShapes(
  roomId: number,
  existingShapes: Shape[],
) {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/shapes/${roomId}`);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/shapes/${roomId}`,
  );
  const oldShapes = res.data.shapes;
  console.log(oldShapes);
  if (oldShapes) {
    oldShapes.map((o: any) => {
      existingShapes.push(JSON.parse(o.parameters));
    });
  }

  return existingShapes;
}
