import { ref, reactive, computed } from 'vue';
import type { AuthService, LoginCredentials, UserInfo, AuthState } from '../interfaces/auth';

/**
 * Vue composable for handling authentication state and operations
 * @param authService The authentication service to use
 * @returns Authentication state and methods
 */
export function useAuth(authService: AuthService) {
  const state = reactive<AuthState>({
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    token: authService.getToken(),
    refreshToken: null,
    user: null,
    error: null,
  });

  const isAuthenticated = computed(() => state.isAuthenticated);
  const isLoading = computed(() => state.isLoading);
  const user = computed(() => state.user);
  const error = computed(() => state.error);

  // Try to load user data if already authenticated
  if (state.isAuthenticated && !state.user) {
    loadUserData();
  }

  async function login(credentials: LoginCredentials) {
    state.isLoading = true;
    state.error = null;
    
    try {
      const response = await authService.login(credentials);
      state.isAuthenticated = true;
      state.token = response.token;
      state.refreshToken = response.refreshToken || null;
      
      if (response.user) {
        state.user = response.user;
      } else {
        await loadUserData();
      }
      
      return true;
    } catch (err) {
      state.error = err instanceof Error ? err.message : 'Login failed';
      return false;
    } finally {
      state.isLoading = false;
    }
  }

  async function logout() {
    state.isLoading = true;
    
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      resetAuthState();
      state.isLoading = false;
    }
  }

  async function loadUserData() {
    if (!state.isAuthenticated) return;
    
    state.isLoading = true;
    
    try {
      const userData = await authService.getCurrentUser();
      state.user = userData;
    } catch (err) {
      state.error = err instanceof Error ? err.message : 'Failed to load user data';
      // If we can't load user data, assume authentication is invalid
      if (err instanceof Error && err.message.includes('authenticated')) {
        resetAuthState();
      }
    } finally {
      state.isLoading = false;
    }
  }

  async function refreshAuth() {
    if (!state.refreshToken) return false;
    
    state.isLoading = true;
    
    try {
      const response = await authService.refreshTokens();
      state.token = response.token;
      state.refreshToken = response.refreshToken || null;
      state.isAuthenticated = true;
      return true;
    } catch (err) {
      resetAuthState();
      state.error = err instanceof Error ? err.message : 'Failed to refresh authentication';
      return false;
    } finally {
      state.isLoading = false;
    }
  }

  function resetAuthState() {
    state.isAuthenticated = false;
    state.token = null;
    state.refreshToken = null;
    state.user = null;
    state.error = null;
  }

  return {
    // State
    isAuthenticated,
    isLoading,
    user,
    error,
    
    // Methods
    login,
    logout,
    refreshAuth,
    loadUserData
  };
}