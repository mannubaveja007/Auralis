# 🧠 Contributing to Smart Notes (Auralis)

Thank you for your interest in contributing to **Smart Notes (Auralis)**!  
We’re thrilled to welcome developers, designers, and AI enthusiasts from the open-source community.  
⭐ **Don’t forget to star the repository** to show your support and help us grow!

---

## 🧭 Code of Conduct
Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) to maintain a respectful, inclusive, and safe environment for all contributors.

---

## 🐞 Reporting Bugs
If you find a bug, please create an **issue** with the following details:
- A clear **title** describing the bug  
- **Steps to reproduce** the issue  
- **Expected** vs **actual** behavior  
- **Screenshots**, if applicable  
- **Environment details** (OS, browser, Node.js version, etc.)

This helps maintainers quickly reproduce and fix the issue.

---

## 💡 Suggesting Features
Feature requests are welcome! Before creating a new one:
1. Check existing issues to avoid duplicates.  
2. Provide a **clear use case** and expected behavior.  
3. Explain the **benefit or improvement** it brings to the project.  
4. Keep feasibility and scope in mind.

---

## 🔁 Pull Request (PR) Process

### 1️⃣ Fork the repository
```bash
git clone https://github.com/YOUR_USERNAME/Auralis.git
cd Auralis

   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run dev
   # Test all affected features
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug"
   ```

   **Commit Message Format:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template with:
     - Description of changes
     - Related issue number (if applicable)
     - Screenshots (for UI changes)
     - Testing steps

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Appwrite account
- Google Gemini API key

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.local` and add your credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_collection_id
GEMINI_API_KEY=your_gemini_key
```

### Running Locally
```bash
npm run dev
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

### Styling
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design
- Test on multiple screen sizes

### File Structure
```
app/          # Next.js app directory
components/   # Reusable React components
context/      # React context providers
lib/          # Utility functions and services
types/        # TypeScript type definitions
```

## Testing

Before submitting PR:
- Test all features manually
- Check responsive design
- Verify authentication flows
- Test AI features (summarize, insights)
- Check error handling

## Documentation

Update documentation when:
- Adding new features
- Changing existing functionality
- Modifying setup process
- Adding new dependencies

## Getting Help

- Check existing issues and PRs
- Read project documentation
- Ask questions in issue comments
- Join community discussions

## Recognition

Contributors will be:
- Listed in project contributors
- Mentioned in release notes
- Credited for significant contributions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Smart Notes! 🎉
