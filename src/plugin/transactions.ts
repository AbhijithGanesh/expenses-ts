import { v4 } from "uuid";
export default function id_generator(obj: string): string {
  return v4() + obj;
}
