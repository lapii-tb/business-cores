# @wl/cores

A modular and extensible business logic library for building consistent applications.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🌟 Overview

This library provides core business logic components and patterns that can be used consistently across applications. It offers:

- Authentication services with consistent interfaces
- State management utilities
- Vue composables for reactive state
- TypeScript interfaces for domain models
- Mock implementations for development without a backend

## 🚀 Quick Start

```bash
# Install with your package manager of choice
npm install @wl/cores
# or
yarn add @wl/cores
# or
pnpm add @wl/cores
```

## 📖 Usage

### Authentication

```typescript
// Using the real auth service
import { createAuthService } from '@wl/cores/auth';
import { useAuth } from '@wl/cores/composables';

const authService = createAuthService('https://api.example.com');
const { login, logout, isAuthenticated, user } = useAuth(authService);

// Using the mock service for development
import { createMockAuthService } from '@wl/cores/auth';
const mockService = createMockAuthService({ delay: 500 });
const { login } = useAuth(mockService);

// Login example
await login({ 
  username: 'user@example.com',
  password: 'password123'
});
```

### Type-Safe Interfaces

```typescript
import { UserInfo, LoginCredentials } from '@wl/cores/interfaces';

const credentials: LoginCredentials = {
  username: 'user@example.com',
  password: 'securePassword',
  rememberMe: true
};
```

## 🧩 Architecture

The library follows these principles:

- **Interface-First Design**: Implementations adhere to well-defined interfaces
- **Framework Agnostic Core**: Business logic is separated from UI frameworks
- **Composable Modules**: Components can be used independently
- **Type Safety**: Full TypeScript support with comprehensive interfaces

## 📦 Modules

- **auth**: Authentication services and utilities
- **composables**: Vue composables for reactive state
- **interfaces**: TypeScript type definitions
- **state**: State management (coming soon)
- **utils**: Utility functions (coming soon)

## 🤝 Contributing

Contributions are welcome! See our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code structure and organization
- Development workflow
- Testing requirements
- Pull request process

## 📋 Requirements

- Node.js 16+
- TypeScript 4.5+
- Compatible with Vue 3 (for composables)

## 📜 License

MIT © [Your Organization]