export interface SignUpResponse {
  username: string;
  email: string;
  token: string;
}

export interface SignInResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}
