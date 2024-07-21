export interface Request{
  // id: number;
  request_id: number;
  request_date: string;
  subject: string;
  address: string;
  pass_id: string;
  pass_name: string;
  r_notes: string;
  company_msg: string;
  request_status_id: number;
  request_status_name: string;
  amana_response_id: number;
  amana_response_name?: string;
  responce_name?: string;
  company_name?: string
}
