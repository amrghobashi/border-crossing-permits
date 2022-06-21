import { Item } from "./item";

export interface Request{
  id: number;
  request_number: number;
  request_date?: string;
  subject?: string;
  address?: string;
  pass_id?: string;
  notes?: string;
  request_status_id?: number;
  request_status?: string;
  tasdek_status_id?: number;
  tasdek_status?: string;
  request_items?: Item[];
}

