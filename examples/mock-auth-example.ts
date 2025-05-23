import { createMockAuthService } from '../src/auth';
import { useAuth } from '../src/composables';
import { LoginCredentials, UserInfo } from '../src/interfaces';

// This is a simple example demonstrating how to use the mock authentication service
async function runMockAuthExample() {
  console.log('🔑 Mock Authentication Example');
  console.log('--------------------------------');

  // Create a mock auth service with 300ms simulated delay
  const authService = createMockAuthService({ delay: 300 });
  
  // Initialize the auth composable
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    error, 
    login, 
    logout 
  } = useAuth(authService);

  // Display initial state
  console.log('Initial authentication state:', isAuthenticated.value);
  
  // Try logging in with invalid credentials
  console.log('\n👤 Attempting login with invalid credentials...');
  try {
    await login({ 
      username: 'wrong@example.com', 
      password: 'incorrect' 
    });
  } catch (e) {
    console.log('❌ Login failed as expected:', error.value);
  }

  // Login with valid credentials
  console.log('\n👤 Attempting login with valid credentials...');
  console.log('⏳ Loading state:', isLoading.value);
  
  const credentials: LoginCredentials = {
    username: 'admin@example.com',
    password: 'admin123',
    rememberMe: true
  };
  
  const success = await login(credentials);
  
  console.log('✅ Login successful:', success);
  console.log('🔐 Authenticated:', isAuthenticated.value);
  console.log('👤 User info:', user.value);
  
  // Demonstrate getting current user
  console.log('\n📋 Current user details:');
  if (user.value) {
    const userData: UserInfo = user.value;
    console.log(`ID: ${userData.id}`);
    console.log(`Username: ${userData.username}`);
    console.log(`Display Name: ${userData.displayName}`);
    console.log(`Roles: ${userData.roles?.join(', ')}`);
    console.log(`Last Login: ${userData.lastLoginAt}`);
  }
  
  // Logout
  console.log('\n🚪 Logging out...');
  await logout();
  console.log('🔓 Authenticated after logout:', isAuthenticated.value);
  console.log('👤 User after logout:', user.value);
  
  console.log('\n✨ Example complete!');
  console.log('--------------------------------');
  console.log('Available test accounts:');
  console.log('- admin@example.com / admin123');
  console.log('- user@example.com / user123');
}

// In a real application, this would be triggered by UI events
// For this example, we'll just run it directly
runMockAuthExample().catch(console.error);