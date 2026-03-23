## [3.00.0] - 2026-03-23

### Included (squashed/merged) commits

- chore: update dependencies and eslint
- chore: update eslint rules and update npm scripts
- feat: update default files
- chore: update packages to latest major versions

### Added

- ESLint + Prettier tooling and project npm scripts for linting/formatting
- New dependencies:
  - `@tanstack/vue-table`
  - `@vuepic/vue-datepicker`
  - `uuid`

### Changed

- Updated/added npm scripts to standardize quality checks:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
  - `npm run lint`
  - `npm run lint:fix`
  - `npm run format`
  - `npm run format:check`
  - `npm run check`
  - `npm run fix`
- Fixed existing source code to resolve ESLint errors and formatting issues
- Updated default/scaffold project files to align with the new lint/format setup
- Upgraded dependencies to newer major versions (see full list below)

### Quality scripts (what each command does)

- `npm run dev`: Starts the Vite development server
- `npm run build`: Builds the application for production (`vite build`)
- `npm run preview`: Serves the production build locally (`vite preview`)
- `npm run lint`: Runs ESLint on `src` (`.js` and `.vue` files) and fails on warnings (`--max-warnings=0`)
- `npm run lint:fix`: Runs ESLint with auto-fixes enabled (`eslint --fix`)
- `npm run format`: Formats files using Prettier and writes changes (`prettier --write`) for `src/**/*.{js,vue}`
- `npm run format:check`: Checks Prettier formatting without writing changes (`--check`) for `src/**/*.{js,vue,css}`
- `npm run check`: Runs both `npm run lint` and `npm run format:check` (lint + formatting verification)
- `npm run fix`: Runs `npm run lint:fix` and then `npm run format` (auto-fix + format)

### Dependency updates (2.00 -> 3.00)

#### `dependencies`

- `@tailwindcss/vite`: `^4.1.3` -> `^4.2.2`
- `@tanstack/vue-table`: added `^8.21.3`
- `@vuepic/vue-datepicker`: added `^12.1.0`
- `@vueuse/core`: `^13.1.0` -> `^14.2.1`
- `axios`: `^1.8.4` -> `^1.13.6`
- `lucide-vue-next`: `^0.487.0` -> `^0.577.0`
- `pinia`: `^3.0.2` -> `^3.0.4`
- `reka-ui`: `^2.2.0` -> `^2.9.2`
- `tailwind-merge`: `^3.2.0` -> `^3.5.0`
- `tailwindcss`: `^4.1.3` -> `^4.2.2`
- `tw-animate-css`: `^1.2.5` -> `^1.4.0`
- `uuid`: added `^13.0.0`
- `vue`: `^3.5.13` -> `^3.5.30`
- `vue-router`: `^4.5.0` -> `^5.0.4`
- `vue-sonner`: `^1.3.2` -> `^2.0.9`

(Dependencies unchanged between 2.00 and 3.00: `@headlessui/tailwindcss`, `@headlessui/vue`, `@heroicons/vue`, `class-variance-authority`, `clsx`, `vaul-vue`.)

#### `devDependencies`

- `@vitejs/plugin-vue`: `^5.2.1` -> `^6.0.5`
- `eslint`: added `^10.1.0`
- `eslint-config-prettier`: added `^10.1.8`
- `eslint-plugin-vue`: added `^10.8.0`
- `globals`: added `^17.4.0`
- `prettier`: `3.5.3` -> `3.8.1`
- `vite`: `^6.2.0` -> `^8.0.1`

### Notes

Major/minor behavior may change due to framework/tooling upgrades (notably `vue-router` v5 and the updated lint/format toolchain). Run:

- `npm run check`
- `npm run fix`
before releasing or deploying.

