export interface CreateAuthLocalModel {
  name: string;
  email: string;
  password: string;
}

export interface CreateAuthLocalResult {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginAuthLocalModel {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AccessToken {
  access_token: string;
}

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  roles: string[];
  exp: number;
}
