export interface ResponsePayload {
  token: Token;
  user: User;
}

interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}
