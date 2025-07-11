#!/bin/bash
# Setup script for vanilla JavaScript blog
echo "Setting up blog development environment..."

# Update package lists
sudo apt-get update

# Python is usually pre-installed, but ensure it's available
sudo apt-get install -y python3

# Optional: Install Node.js for alternative development tools
sudo apt-get install -y nodejs npm

# Make the setup script executable
chmod +x .devcontainer/setup.sh

echo "Setup complete! You can now run the blog with:"
echo "  python3 -m http.server 8000"
echo ""
echo "The blog will be available at http://localhost:8000"
echo "Codespaces will automatically forward port 8000 for external access."