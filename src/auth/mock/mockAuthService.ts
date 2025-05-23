import { 
  AuthService, 
  LoginCredentials, 
  LoginResponse, 
  UserInfo 
} from '../../interfaces/auth';

/**
 * Mock implementation of AuthService for development and testing
 * Simulates API calls with local storage persistence
 */
export class MockAuthService implements AuthService {
  private tokenKey = 'mock_auth_token';
  private refreshTokenKey = 'mock_auth_refresh_token';
  private userKey = 'mock_auth_user';
  
  // Predefined users for testing
  private users: Record<string, { password: string, userInfo: UserInfo }> = {
    'admin@example.com': {
      password: 'admin123',
      userInfo: {
        id: '1',
        username: 'admin@example.com',
        email: 'admin@example.com',
        displayName: 'Admin User',
        roles: ['admin'],
        permissions: ['read:all', 'write:all'],
        lastLoginAt: new Date().toISOString()
      }
    },
    'user@example.com': {
      password: 'user123',
      userInfo: {
        id: '2',
        username: 'user@example.com',
        email: 'user@example.com',
        displayName: 'Regular User',
        roles: ['user'],
        permissions: ['read:own'],
        lastLoginAt: new Date().toISOString()
      }
    }
  };

  // Optional delay to simulate network latency (in ms)
  private delay: number;
  
  constructor(options?: { delay?: number }) {
    this.delay = options?.delay || 500;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    await this.simulateDelay();
    
    const user = this.users[credentials.username];
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid username or password');
    }
    
    const token = this.generateToken(user.userInfo);
    const refreshToken = this.generateRefreshToken(user.userInfo.id);
    
    // Update last login time
    user.userInfo.lastLoginAt = new Date().toISOString();
    
    // Store in localStorage for persistence
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(user.userInfo));
    
    return {
      token,
      refreshToken,
      expiresIn: 3600,
      user: { ...user.userInfo }
    };
  }

  async logout(): Promise<void> {
    await this.simulateDelay();
    this.clearStorage();
  }

  async refreshTokens(): Promise<LoginResponse> {
    await this.simulateDelay();
    
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const userJson = localStorage.getItem(this.userKey);
    
    if (!refreshToken || !userJson) {
      throw new Error('No refresh token available');
    }
    
    try {
      const user = JSON.parse(userJson) as UserInfo;
      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user.id);
      
      localStorage.setItem(this.tokenKey, newToken);
      localStorage.setItem(this.refreshTokenKey, newRefreshToken);
      
      return {
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: 3600,
        user
      };
    } catch (error) {
      this.clearStorage();
      throw new Error('Failed to refresh tokens');
    }
  }

  async getCurrentUser(): Promise<UserInfo> {
    await this.simulateDelay();
    
    const userJson = localStorage.getItem(this.userKey);
    if (!userJson) {
      throw new Error('User not authenticated');
    }
    
    return JSON.parse(userJson) as UserInfo;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Add a new test user (for development purposes)
  addUser(username: string, password: string, userInfo: Partial<UserInfo>): void {
    this.users[username] = {
      password,
      userInfo: {
        id: Math.random().toString(36).substring(2, 11),
        username,
        email: username,
        displayName: username,
        roles: ['user'],
        permissions: [],
        lastLoginAt: new Date().toISOString(),
        ...userInfo
      }
    };
  }

  private clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  private generateToken(user: UserInfo): string {
    // This is a simplified mock token - not for production use
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    
    return `mock_jwt.${btoa(JSON.stringify(payload))}.signature`;
  }

  private generateRefreshToken(userId: string): string {
    return `mock_refresh_${userId}_${Date.now()}`;
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }
}

/**
 * Creates a configured mock auth service instance
 * @param options Configuration options for the mock service
 * @returns Configured MockAuthService instance
 */
export function createMockAuthService(options?: { delay?: number }): AuthService {
  return new MockAuthService(options);
}