export enum EUserRoles {
  "provider" = "provider",
  "consumer" = "consumer",
  "delivery" = "delivery",
  "admin" = "admin",
}

export interface IUserSchema {
  user_id: string;
  user_email: string;
  user_password: string;
  user_name: string;
  user_role: EUserRoles;
  user_open_for_order: null | boolean;
  user_active_deliv_req: null | string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  userInfo: null | IUserSchema;
  status: string;
}
