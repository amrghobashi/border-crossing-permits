import { Item } from "./item";

export interface Request{
  id: number;
  request_id: number;
  request_date: string;
  subject: string;
  address: string;
  pass_id: string;
  r_notes: string;
  company_msg: string;
  request_status_id: number;
  request_status_name: string;
  amana_responce_id?: number;
  responce_name?: string;
}

