export interface Request {
  request_id: number;
  request_date: string;
  subject: string;
  address: string;
  gate_id: string;
  gate_name: string;
  r_notes: string;
  company_msg: string;
  request_status_id: number;
  request_status_name: string;
  response_id: number;
  major_response_name?: string;
  responce_name?: string;
  company_name?: string
}
