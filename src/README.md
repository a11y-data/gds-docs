# Playwright tests for survey habits

This folder contains Playwright tests for the GDS application.

These tests are designed to take automated screenshots of the application in various states, which can be used for visual regression testing and accessibility audits.

## How to run the

- in accessibledata root:
  - `pnpm gds:start:playwright:signed-in`
- in gds-docs root: `npm test`

### User type

We authenticate users while running playwright tests. There are 3 different user types:

- `playwright@preignition.org` - user signed in with access to `playwright` team

### Run type

- `pnpm survey:start:playwright:signed-in` loads on **localhost:7173**   and loads `playwright@preignition.org`
-
