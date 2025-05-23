#!/bin/bash

# WL Cores npm publish script

# Exit on error
set -e

# Define colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting WL Cores publish process...${NC}"

# 1. Check if logged in to npm
echo -e "\n${GREEN}Checking npm login status...${NC}"
npm whoami &> /dev/null
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: You are not logged in to npm. Please run 'npm login' first.${NC}"
  exit 1
else
  echo -e "${GREEN}Successfully authenticated with npm.${NC}"
fi

# 2. Ensure working directory is clean
echo -e "\n${GREEN}Checking git status...${NC}"
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}Error: Working directory is not clean. Please commit or stash changes first.${NC}"
  exit 1
fi

# 3. Build the package
echo -e "\n${GREEN}Building package...${NC}"
npm run build

# 4. Version bump prompt
echo -e "\n${GREEN}Current version: $(npm pkg get version | tr -d \")${NC}"
echo -e "${YELLOW}Choose version bump type:${NC}"
echo "1) patch - Bug fixes and minor changes"
echo "2) minor - New features, backward compatible"
echo "3) major - Breaking changes"
echo "4) custom - Enter custom version"
read -p "Enter choice [1-4]: " VERSION_CHOICE

case $VERSION_CHOICE in
  1)
    VERSION_TYPE="patch"
    ;;
  2)
    VERSION_TYPE="minor"
    ;;
  3)
    VERSION_TYPE="major"
    ;;
  4)
    read -p "Enter custom version (e.g., 1.2.3): " CUSTOM_VERSION
    VERSION_TYPE="--new-version $CUSTOM_VERSION"
    ;;
  *)
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
    ;;
esac

# 5. Update version
echo -e "\n${GREEN}Updating version...${NC}"
if [ $VERSION_CHOICE -eq 4 ]; then
  npm version --no-git-tag-version $CUSTOM_VERSION
else
  npm version --no-git-tag-version $VERSION_TYPE
fi

NEW_VERSION=$(npm pkg get version | tr -d \")
echo -e "${GREEN}New version: $NEW_VERSION${NC}"

# 6. Push changes to git
echo -e "\n${GREEN}Creating git commit and tag...${NC}"
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
git push --follow-tags

# 7. Publish to npm
echo -e "\n${GREEN}Publishing to npm...${NC}"
npm publish

echo -e "\n${GREEN}✅ WL Cores v$NEW_VERSION successfully published!${NC}"
