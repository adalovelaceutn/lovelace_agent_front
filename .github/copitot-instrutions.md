You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.
## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
## Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
## Accessibility Requirements
- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.
## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Angular Feature Architecture Rules
When I ask to create or implement a "Feature", strictly follow this directory structure and architectural pattern:

## 1. Directory Structure
All feature-related files must be contained within src/app/features/[feature-name]/ using these subdirectories:

/components: For internal UI/presentational components (dumb components).

/pages: For container components that act as routed views or top-level orchestrators.

/services: For business logic, @Injectable classes, and API interactions.

/models: For TypeScript interfaces, types, and DTOs (using .model.ts naming convention).

## 2. Technical Requirements
Standalone Components: Always set standalone: true for all components.

Reactivity: Prioritize Angular Signals for state management and local data flow.

Control Flow: Use the new built-in syntax (@if, @for, @switch).

Styling: Use '@angular/material' utility classes for layout and styling. Avoid custom CSS unless strictly necessary.

## Naming Convention:

Files: feature-name.component.ts, feature-name.service.ts, feature-name.model.ts.

Selectors: Use app- as the prefix.

## 3. Code Generation Template
When generating a feature, always provide:

The folder structure layout.

The implementation for the requested components, pages, services, and models.

Ensure the Service uses HttpClient for data fetching.