export type LoginData = {
  userEmail: string;
  password: string;
};

export type SignUpFormData = {
  userEmail: string;
  userName: string;
  password: string;
  passwordCheck: string;
  contact: number;
};

export type SignUpData = {
  userEmail: string;
  userName: string;
  password: string;
  passwordCheck: string;
  contact: number;
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
