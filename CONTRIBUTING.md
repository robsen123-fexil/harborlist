# Contributing to HarborList

Thank you for your interest in contributing!

## Development setup

1. Use Node.js 20 (`nvm use` reads `.nvmrc`).
2. Install dependencies: `npm ci`
3. Start the dev server: `npm run dev`
4. Run tests: `npm test`

## Pull request guidelines

- Keep changes focused and well-tested.
- Place tests in the `tests/` directory, not beside source files.
- Run `npm test` and `npm run lint` before submitting.
- Update `CHANGELOG.md` for user-visible changes.

## Commit messages

Use clear, imperative subject lines (e.g. "Add mooring type filter", "Fix selection persistence").

## Code style

- TypeScript strict mode
- 2-space indentation (see `.editorconfig`)
- LF line endings

## Reporting issues

Use the GitHub issue templates for bugs and feature requests.

