# Contributing to Lyrics Tags Generator

Thank you for your interest in contributing to Lyrics Tags Generator! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [yarn](https://yarnpkg.com/) package manager

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/tags.notnick.io.git
   cd tags.notnick.io
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Create a `.env.local` file (optional):
   ```env
   DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
   ```

5. Start the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Contribute

### Types of Contributions

- Bug fixes
- New features
- Documentation improvements
- Code refactoring
- Performance improvements
- Test coverage

## Development Workflow

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/bug-description
   ```

2. Make your changes and commit them with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request from your fork to the main repository

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid using `any` type when possible
- Add proper type definitions for functions and components

### Code Style

- Follow the existing code style in the project
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Add comments for complex logic

### React Components

- Use functional components with hooks
- Keep components focused and reusable
- Use proper prop types

### Formatting

- The project uses Prettier for code formatting
- Run `yarn format` before committing (if available)

### Testing

- Add tests for new features when applicable
- Ensure all tests pass before submitting a PR

## Pull Request Process

1. **Update Documentation**: Update the README.md or other documentation if needed
2. **Test Your Changes**: Ensure your changes work as expected
3. **Clear Description**: Provide a clear description of what your PR does
4. **Link Issues**: Reference any related issues in your PR description
5. **Wait for Review**: A maintainer will review your PR and provide feedback
6. **Address Feedback**: Make any requested changes
7. **Merge**: Once approved, your PR will be merged

### PR Title Format

Use clear, descriptive titles:
- `feat: add new tag generation format`
- `fix: resolve issue with featured artists parsing`
- `docs: update API documentation`
- `refactor: improve performance of tag processing`

## Reporting Bugs

Found a bug? Help us fix it!

1. Check if the bug has already been reported in [Issues](https://github.com/alsonick/tags.notnick.io/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce the bug
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

## Feature Requests

Have an idea for a new feature?

1. Check if it's already been suggested in [Issues](https://github.com/alsonick/tags.notnick.io/issues)
2. If not, create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Any implementation ideas you have

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with your question
- Reach out to the maintainer [@alsonick](https://github.com/alsonick)

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to Lyrics Tags Generator!