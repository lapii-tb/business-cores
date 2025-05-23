#!/bin/bash
set -e

# Configuration
SOURCE_DIR="$(pwd)"
GITHUB_REPO_URL="https://github.com/lapii-tb/business-cores.git"
TEMP_DIR="/tmp/cores-sync-$(date +%s)"
MAIN_BRANCH="main"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Starting sync of packages/cores to GitHub repository${NC}"

# Check if we're in the right directory
if [[ ! -f "${SOURCE_DIR}/package.json" ]]; then
  echo -e "${RED}Error: Please run this script from the packages/cores directory${NC}"
  exit 1
fi

# Clone the GitHub repository
echo -e "${YELLOW}🔄 Cloning GitHub repository to temporary directory...${NC}"
git clone $GITHUB_REPO_URL $TEMP_DIR

# Ensure we have the right remote repository
cd $TEMP_DIR
echo -e "${YELLOW}🔍 Checking remote repository...${NC}"
REMOTE_URL=$(git remote get-url origin)
if [[ "$REMOTE_URL" != "$GITHUB_REPO_URL" ]]; then
  echo -e "${RED}Error: Remote repository URL mismatch${NC}"
  echo "Expected: $GITHUB_REPO_URL"
  echo "Got: $REMOTE_URL"
  exit 1
fi

# Get the latest changes
echo -e "${YELLOW}⬇️  Pulling latest changes from GitHub...${NC}"
git pull origin $MAIN_BRANCH

# Remove everything except .git and special GitHub files
echo -e "${YELLOW}🧹 Cleaning up repository...${NC}"
find . -mindepth 1 -maxdepth 1 -not -path "./.git" -not -path "./.github" -exec rm -rf {} \;

# Copy new content from source directory
echo -e "${YELLOW}📋 Copying files from monorepo to GitHub repository...${NC}"
cp -R $SOURCE_DIR/* $TEMP_DIR/
cp $SOURCE_DIR/.gitignore $TEMP_DIR/

# Replace README with GitHub-specific version if it exists
if [[ -f "${SOURCE_DIR}/GITHUB_README.md" ]]; then
  echo -e "${YELLOW}📝 Using GitHub-specific README...${NC}"
  mv $TEMP_DIR/GITHUB_README.md $TEMP_DIR/README.md
fi

# Git operations
echo -e "${YELLOW}🔍 Checking for changes...${NC}"
git add -A
if git diff --cached --quiet; then
  echo -e "${GREEN}✅ No changes to commit${NC}"
else
  echo -e "${YELLOW}📝 Committing changes...${NC}"
  git commit -m "Sync from monorepo $(date '+%Y-%m-%d %H:%M:%S')"

  echo -e "${YELLOW}⬆️  Pushing changes to GitHub...${NC}"
  git push origin $MAIN_BRANCH
  echo -e "${GREEN}✅ Successfully pushed changes to GitHub${NC}"
fi

# Clean up
echo -e "${YELLOW}🧹 Cleaning up temporary directory...${NC}"
cd $SOURCE_DIR
rm -rf $TEMP_DIR

echo -e "${GREEN}✅ Sync completed successfully!${NC}"
echo "GitHub repository: $GITHUB_REPO_URL"
