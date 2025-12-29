export type AuthStep =
  | "SIGN_IN"
  | "SIGN_UP"
  | "CONFIRM_SIGN_UP"
  | "SIGNED_IN";

export interface AuthState {
  step: AuthStep;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
  user?: User;
}

export interface User{
  username: string;
  userId: string;
}
export interface  SignInPayload {
  username: string;
  password: string;
}
export interface SignUpPayload {
  email: string;
  givenName: string;
  familyName: string;
  password: string;
}

export interface ConfirmSignUpPayload {
  username: string;
  code: string;
}