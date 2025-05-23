# Quick Start Guide for Contributors

Welcome to the @wl/cores project! This guide will help you get started as a contributor.

## 1. Setup Your Development Environment

### Prerequisites
- Node.js (v16 or later)
- pnpm (v7 or later)
- Git

### Clone the Repository
```bash
git clone https://github.com/your-organization/cores.git
cd cores
```

### Install Dependencies
```bash
pnpm install
```

## 2. Understand the Project Structure

```
src/
├── auth/             # Authentication services
│   ├── mock/         # Mock implementations
│   └── index.ts
├── composables/      # Vue composables
├── interfaces/       # TypeScript interfaces
├── state/            # State management (coming soon)
├── utils/            # Utility functions (coming soon)
└── index.ts          # Main entry point
```

## 3. Development Workflow

### Run in Development Mode
```bash
pnpm dev
```

### Build the Package
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
```

## 4. Make Your First Contribution

1. **Pick an Issue**: Find an issue labeled `good first issue` on GitHub

2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Implement your feature or fix

4. **Test Your Changes**:
   ```bash
   pnpm test
   ```

5. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add your feature description"
   ```

6. **Push Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**: Open a PR from your fork to the main repository

## 5. Running Examples

The `examples` directory contains sample implementations:

```bash
# Run the mock authentication example
ts-node examples/mock-auth-example.ts
```

## 6. Coding Standards

- Follow TypeScript best practices
- Use interfaces for all public APIs
- Write unit tests for all functionality
- Document public APIs with JSDoc comments
- Follow the existing code style and patterns

## 7. Using the Mock Services

During development, you can use the mock implementations to test without a backend:

```typescript
import { createMockAuthService } from '@wl/cores/auth';

const authService = createMockAuthService({ delay: 500 });

// Mock service has predefined test users:
// - admin@example.com / admin123
// - user@example.com / user123
```

## 8. Getting Help

- **GitHub Discussions**: Ask questions and discuss ideas
- **Issues**: Report bugs or suggest features
- **Pull Requests**: Get feedback on your code

## 9. Next Steps

After your first contribution, consider:

- Taking on more complex issues
- Adding documentation or examples
- Helping review other pull requests
- Suggesting new features or improvements

Thank you for contributing to @wl/cores!