export type LoginData = {
  userEmail: string;
  password: string;
};

export type User = {
  token: string;
  userName: string;
  userEmail: string;
};

export type AuthState = {
  isLoading: boolean;
  token: string | null;
  error: string | null;
};
