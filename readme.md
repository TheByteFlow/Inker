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
- [🚀 Coding Standards](#-coding-standards)
  - [General Guidelines](#general-guidelines)
  - [Naming Conventions](#naming-conventions)
  - [Git Commit Standards](#naming-conventions)
- [⚡ Quick Start Commands](#-quick-start-commands)
- [Support](#-support)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- **Docker** - [Installation Guide](https://docs.docker.com/engine/install)
- **Docker Compose** - [Installation Guide](https://docs.docker.com/compose/install/linux)

### Installation Steps

**Forking the repository**


1. Go to the [Inker Respository test branch](https://github.com/TheByteFlow/Inker/tree/test).
2. Click on the fork option on the top right under the navbar.
3. Click on Create a new fork.
4. Uncheck the "Copy the master branch only" option.
5. Click on the Create fork option.

The forked repository will be available in "your repositories".


**Cloning the repository**


1. Go to your repositories and you can see the forked repository of Inker.
2. Click on the "Code" option and copy the repository url.
3. Go to your desired file location in the command prompt (terminal for linux).
4. Enter the command
    ```bash
   git clone the-url-you-copied
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






hey there 


Verify the backend is running:
```bash
curl -X GET http://localhost:3000
```

## 📝 Contributing Process

### Branch Management

1. **Create your feature branch**
   ```bash
   git checkout -b origin/frontend/test
   ```
   or 

    ```bash
   git checkout -b origin/backend/test
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
   git push origin test
   ```

### Submitting PRs

1. Go to our GitHub repository
2. Click "New Pull Request"
3. Select `test` as the base branch
4. Add a descriptive title and detailed description
5. Link any related issues

## 🚀 Coding Standards

Maintaining a consistent coding style ensures code readability and maintainability. Please follow these guidelines:

### General Guidelines

- Follow the **SOLID** principles and **MVC architecture**.
- Keep functions and components **small** and **focused on a single responsibility**.
- Write **clean and self-documenting** code with meaningful variable and function names.
- Avoid unnecessary **comments**—the code should be **self-explanatory**.
- Ensure **no console logs** or debugging statements are left before committing.

### Naming Conventions

- **Files & Folders:**
  - Use `kebab-case` for folders (e.g., `user-profile`).
  - Use `dot-separated` names for files inside folders (e.g., `user.controller.ts`, `auth.service.ts`, `blog.model.ts`).
- **Variables & Functions:**
  - Use `camelCase` for variables and functions (e.g., `fetchUserData`).
  - Use `PascalCase` for React components and classes (e.g., `UserProfile`).
- **Database Schema Fields:**
  - Use `snake_case` for database fields (e.g., `profile_picture`).
- **Constants:**
  - Use `UPPER_CASE` for constants (e.g., `DEFAULT_PAGE_SIZE`).

### Git Commit Standards

Use **Conventional Commits** format for consistency:
<type>: <message>

markdown
Copy
Edit
#### Common Commit Types:
- `feat`: New feature added (`feat: add user authentication`)
- `fix`: Bug fix (`fix: resolve login issue`)
- `chore`: Maintenance work (`chore: update dependencies`)
- `docs`: Documentation update (`docs: improve README`)
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code improvements without changing functionality
- `test`: Adding or modifying tests

Example commits:
```bash
git commit -m "feat: implement JWT authentication"
git commit -m "fix: resolve profile picture upload bug"
git commit -m "docs: add API usage instructions"

## ⚡ Quick Start Commands

```bash
# Clone and enter project
git clone https://github.com/your-username/inker-blog.git
cd inker-blog

# Start services
sudo docker compose up

# Create new feature branch
git checkout -b test origin/test
# Commit and push changes
git add .
git commit -m "feat: your changes"
git push origin test
```

## Support

Need help? Here's how you can reach us:
- Open an [Issue](https://github.com/your-username/inker-blog/issues)

---

<div align="center">

Thank you for contributing to INKER Blog! 🎉

</div>
