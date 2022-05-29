import { Mode } from "./Modes";

export type payments = {
  transaction_id: string;
  transaction_name: string;
  transaction_date: Date;
  Mode: Mode;
};
