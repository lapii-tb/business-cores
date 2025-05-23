#!/bin/bash
set -e

# Configuration
MONOREPO_CORES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MONOREPO_ROOT="$(cd "$MONOREPO_CORES_DIR/../.." && pwd)"
GITHUB_REPO_URL="https://github.com/your-organization/cores.git"
TEMP_DIR="/tmp/cores-sync-from-github-$(date +%s)"
MAIN_BRANCH="main"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Starting sync from GitHub repository to monorepo${NC}"

# Clone the GitHub repository
echo -e "${YELLOW}🔄 Cloning GitHub repository to temporary directory...${NC}"
git clone $GITHUB_REPO_URL $TEMP_DIR
cd $TEMP_DIR

# Ensure we have the right remote repository
echo -e "${YELLOW}🔍 Checking remote repository...${NC}"
REMOTE_URL=$(git remote get-url origin)
if [[ "$REMOTE_URL" != "$GITHUB_REPO_URL" ]]; then
  echo -e "${RED}Error: Remote repository URL mismatch${NC}"
  echo "Expected: $GITHUB_REPO_URL"
  echo "Got: $REMOTE_URL"
  exit 1
fi

# Copy files from GitHub repo to monorepo (excluding GitHub-specific files)
echo -e "${YELLOW}📋 Copying files from GitHub repository to monorepo...${NC}"
find . -mindepth 1 -maxdepth 1 \
  -not -path "./.git" \
  -not -path "./.github" \
  -not -path "./README.md" \
  -not -path "./GITHUB_README.md" \
  -not -path "./GITHUB_SETUP.md" \
  -exec cp -R {} $MONOREPO_CORES_DIR/ \;

# Check for changes in the monorepo
cd $MONOREPO_ROOT
echo -e "${YELLOW}🔍 Checking for changes in monorepo...${NC}"
git status packages/cores

echo -e "${GREEN}✅ Sync completed!${NC}"
echo "Files from GitHub have been copied to your monorepo."
echo -e "${YELLOW}Please review the changes and commit them manually.${NC}"

# Cleanup
echo -e "${YELLOW}🧹 Cleaning up temporary directory...${NC}"
rm -rf $TEMP_DIR

echo -e "${GREEN}Done!${NC}"