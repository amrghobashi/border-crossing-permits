export interface User {
    id: number,
    _token: string,
    _tokenDate: Date,
    routes: Routes[],
    admin_flag: number
}

export interface AuthResponseData {
    access_token: string;
    token_type: string;
    company_id: number;
    admin_flag: number;
    expiry_time: number;
    routes: []
  }

  export interface Routes {
    route_id: number,
    route_name: string,
    user_type_id: number
}