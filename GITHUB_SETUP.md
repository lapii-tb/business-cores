# Setting Up the Cores Package for GitHub Community Contributions

This document provides instructions for setting up and maintaining the `@wl/cores` package as a standalone GitHub repository while keeping it synchronized with your monorepo.

## Initial Setup

### 1. Create a New GitHub Repository

Create a new public repository on GitHub to host the `cores` package:
- Repository name: `cores` (or another suitable name)
- Make it public to allow community contributions
- Add an MIT license (or your preferred open source license)
- Initialize with a README

### 2. Prepare the Cores Package for GitHub

The package already includes:
- `.gitignore` - For standalone repository use
- `GITHUB_README.md` - Will become the README for the GitHub repository
- `CONTRIBUTING.md` - Contribution guidelines
- `scripts/sync-to-github.sh` - Script to sync changes between repos

### 3. First-Time Sync to GitHub

1. Clone your new GitHub repository:
   ```bash
   git clone https://github.com/your-organization/cores.git /tmp/cores-github
   cd /tmp/cores-github
   ```

2. Copy the package contents:
   ```bash
   # Clear everything except .git
   find . -mindepth 1 -maxdepth 1 -not -path "./.git" -exec rm -rf {} \;
   
   # Copy from monorepo
   cp -R /path/to/monorepo/packages/cores/* .
   cp /path/to/monorepo/packages/cores/.gitignore .
   
   # Use GitHub-specific README
   mv GITHUB_README.md README.md
   ```

3. Commit and push:
   ```bash
   git add -A
   git commit -m "Initial import from monorepo"
   git push origin main
   ```

## Ongoing Synchronization

### From Monorepo to GitHub

Use the provided script:

1. Navigate to the cores package directory:
   ```bash
   cd /path/to/monorepo/packages/cores
   ```

2. Edit the `scripts/sync-to-github.sh` script to update:
   - `GITHUB_REPO_URL` - Set to your GitHub repository URL
   - `MAIN_BRANCH` - Adjust if you use a different branch name

3. Run the sync script:
   ```bash
   ./scripts/sync-to-github.sh
   ```

### From GitHub to Monorepo

When accepting community contributions:

1. Review and merge pull requests on GitHub

2. Manually sync changes back to the monorepo:
   ```bash
   cd /tmp/cores-sync
   git clone https://github.com/your-organization/cores.git
   
   # Copy changes to monorepo (excluding GitHub-specific files)
   find . -mindepth 1 -maxdepth 1 -not -path "./.git" -not -path "./README.md" -not -path "./.github" | xargs -I{} cp -R {} /path/to/monorepo/packages/cores/
   
   # Update package within monorepo
   cd /path/to/monorepo
   git add packages/cores
   git commit -m "Sync changes from GitHub community contributions"
   ```

## CI/CD Integration

To automate synchronization:

1. Create a GitHub Action in your monorepo to sync changes to the GitHub repository whenever changes are made to the `packages/cores` directory

2. Set up a workflow to notify monorepo maintainers of new pull requests in the GitHub repository

## Managing Versions

1. Keep version numbers synchronized between repositories
2. Document version compatibility with your monorepo components
3. Consider using [changesets](https://github.com/changesets/changesets) for version management

## Security Considerations

1. Be cautious with sensitive code or configurations
2. Review all community contributions carefully
3. Set up security scanning for the GitHub repository
4. Use GitHub's dependency alerts and Dependabot

## Common Issues

1. **Dependency conflicts**: The standalone package might have different dependencies than your monorepo. Consider using peer dependencies for framework dependencies.

2. **Import paths**: Ensure imports work in both contexts. Use relative imports within the package.

3. **Testing**: Include standalone tests that don't rely on other monorepo packages.