# Contributing to @wl/cores

Thank you for your interest in contributing to the @wl/cores package! This document provides guidelines and instructions to help you contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

We expect all contributors to adhere to our Code of Conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- pnpm (version 7 or later)

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally
   ```
   git clone https://github.com/your-username/tycho.git
   cd tycho
   ```
3. Install dependencies
   ```
   pnpm install
   ```
4. Build the project
   ```
   pnpm build
   ```

## Development Workflow

### Directory Structure

The `@wl/cores` package follows this structure:

```
packages/cores/
├── src/
│   ├── auth/           # Authentication-related code
│   ├── composables/    # Vue composables
│   ├── interfaces/     # TypeScript interfaces
│   ├── state/          # State management
│   ├── utils/          # Utility functions
│   └── index.ts        # Main entry point
├── tests/              # Test files
├── package.json
└── tsconfig.json
```

### Running Tests

We use Vitest for testing:

```
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch
```

### Local Development

To develop and test locally:

1. Run the build in watch mode:
   ```
   pnpm dev
   ```

2. In another project, you can link to your local version:
   ```
   pnpm link ../path/to/tycho/packages/cores
   ```

## Code Conventions

### General Guidelines

- Write clean, readable, and maintainable code
- Add comments for complex logic
- Keep files focused on a single responsibility
- Use TypeScript for all code

### Naming Conventions

- **Files**: Use camelCase for filenames (e.g., `authService.ts`)
- **Interfaces**: Use PascalCase prefixed with `I` (e.g., `IUserInfo`)
- **Classes**: Use PascalCase (e.g., `DefaultAuthService`)
- **Functions**: Use camelCase (e.g., `createAuthService`)
- **Constants**: Use UPPER_SNAKE_CASE for true constants

### Architecture Principles

1. **Interface-First Design**: Define interfaces before implementations
2. **Framework Agnostic**: Core logic should be framework-agnostic where possible
3. **Composability**: Design components to be easily composed
4. **Explicit Dependencies**: Dependencies should be injected rather than imported directly

## Submitting Changes

### Pull Requests

1. Create a new branch for your feature or fix
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with clear, descriptive commit messages
   ```
   git commit -m "feat: add user profile management"
   ```

3. Push your branch to your fork
   ```
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request against the main repository

### PR Guidelines

- Include a clear description of the changes
- Reference any related issues
- Ensure all tests pass
- Add new tests for new functionality
- Update documentation as necessary
- Follow our [commit message format](#commit-message-format)

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(auth): add token refresh functionality

Implements automatic token refresh mechanism when tokens expire.

Closes #123
```

## Release Process

Releases are managed by the core team following these steps:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a release tag
4. Publish to npm

As a contributor, you don't need to worry about this process, but it's good to be aware of it.

## Questions?

If you have any questions or need help, please open an issue or reach out to the maintainers.

Thank you for contributing to @wl/cores!