import axios from 'axios';
import { 
  AuthService, 
  LoginCredentials, 
  LoginResponse, 
  UserInfo 
} from '../interfaces/auth';

/**
 * Default authentication service implementation
 * Can be extended or replaced by applications
 */
export class DefaultAuthService implements AuthService {
  private baseUrl: string;
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'auth_refresh_token';
  private userKey = 'auth_user';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseUrl}/auth/login`, 
        credentials
      );
      
      const { token, refreshToken, user } = response.data;
      
      // Store authentication data
      localStorage.setItem(this.tokenKey, token);
      if (refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
      }
      if (user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        await axios.post(
          `${this.baseUrl}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage regardless of API success
      this.clearStorage();
    }
  }

  async refreshTokens(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseUrl}/auth/refresh`,
        { refreshToken }
      );
      
      const { token, refreshToken: newRefreshToken } = response.data;
      
      localStorage.setItem(this.tokenKey, token);
      if (newRefreshToken) {
        localStorage.setItem(this.refreshTokenKey, newRefreshToken);
      }
      
      return response.data;
    } catch (error) {
      this.clearStorage();
      throw new Error('Failed to refresh authentication');
    }
  }

  async getCurrentUser(): Promise<UserInfo> {
    const cachedUser = localStorage.getItem(this.userKey);
    if (cachedUser) {
      return JSON.parse(cachedUser) as UserInfo;
    }

    const token = this.getToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await axios.get<UserInfo>(
        `${this.baseUrl}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      localStorage.setItem(this.userKey, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.clearStorage();
      }
      throw new Error('Failed to get current user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }
}

/**
 * Creates a configured auth service instance
 * @param baseUrl API base URL
 * @returns Configured AuthService instance
 */
export function createAuthService(baseUrl: string): AuthService {
  return new DefaultAuthService(baseUrl);
}