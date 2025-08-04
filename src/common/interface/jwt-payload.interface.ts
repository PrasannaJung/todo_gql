export interface JwtPayload {
  sub: string; // this will be the user ID
  email: string;
  username: string;
  iat?: number; // issued at time
  exp?: number; // expiration time
}
