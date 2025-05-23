export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: UserInfo;
}

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  displayName?: string;
  roles?: string[];
  permissions?: string[];
  lastLoginAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  error: string | null;
}

export interface AuthService {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  logout(): Promise<void>;
  refreshTokens(): Promise<LoginResponse>;
  getCurrentUser(): Promise<UserInfo>;
  isAuthenticated(): boolean;
  getToken(): string | null;
}

export interface AuthStoreOperations {
  setAuthenticated(isAuthenticated: boolean): void;
  setUser(user: UserInfo | null): void;
  setToken(token: string | null): void;
  setRefreshToken(refreshToken: string | null): void;
  setLoading(isLoading: boolean): void;
  setError(error: string | null): void;
  clearAuth(): void;
}