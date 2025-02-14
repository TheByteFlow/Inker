<div align="center">

# 🖋️ Contributing to INKER Blog

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/docker-required-blue.svg?style=flat-square" alt="Docker Required" />
  <img src="https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square" alt="License" />
</p>

Welcome to the INKER Blog project! We're excited to have you here. This guide will help you get started with contributing to our project.

</div>

## 📑 Table of Contents

- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [🛠️ Development Setup](#️-development-setup)
  - [Running the Application](#running-the-application)
  - [Health Checks](#health-checks)
- [📝 Contributing Process](#-contributing-process)
  - [Branch Management](#branch-management)
  - [Making Changes](#making-changes)
  - [Submitting PRs](#submitting-prs)
- [⚡ Quick Start Commands](#-quick-start-commands)
- [Support](#-support)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- **Docker** - [Installation Guide](https://docs.docker.com/engine/install)
- **Docker Compose** - [Installation Guide](https://docs.docker.com/compose/install/linux)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/inker-blog.git
   cd inker-blog
   ```

## 🛠️ Development Setup

### Running the Application

1. **Start all services**
   ```bash
   sudo docker compose up
   ```

   > 💡 **Troubleshooting Tip**: If MongoDB port 27017 is in use:
   > ```bash
   > sudo kill -9 $(sudo lsof -t -i:27017)
   > ```

2. **Access the applications**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

### Health Checks

Verify the backend is running:
```bash
curl -X GET http://localhost:3000
```

## 📝 Contributing Process

### Branch Management

1. **Create your feature branch**
   ```bash
   git checkout -b feature/your-feature-name origin/test
   ```

2. **Keep your branch updated**
   ```bash
   git pull origin test
   ```

### Making Changes

1. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```

2. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting PRs

1. Go to our GitHub repository
2. Click "New Pull Request"
3. Select `test` as the base branch
4. Add a descriptive title and detailed description
5. Link any related issues

## ⚡ Quick Start Commands

```bash
# Clone and enter project
git clone https://github.com/your-username/inker-blog.git
cd inker-blog

# Start services
sudo docker compose up

# Create new feature branch
git checkout -b feature/your-feature-name origin/test

# Commit and push changes
git add .
git commit -m "feat: your changes"
git push origin feature/your-feature-name
```

## Support

Need help? Here's how you can reach us:
- Open an [Issue](https://github.com/your-username/inker-blog/issues)

---

<div align="center">

Thank you for contributing to INKER Blog! 🎉

</div>