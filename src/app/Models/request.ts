export interface Request{
  id: number;
  request_number?: number;
  request_date?: string;
  subject?: string;
  address?: string;
  pass_id?: string;
  notes?: string;
  request_status?: string;
  tasdek_status?: string;
  tasdek_detail?: string;
}

