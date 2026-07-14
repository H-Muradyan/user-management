# User Management

React + TypeScript app that lists users from the JSONPlaceholder API. You can search, sort by name, filter by city, open a user's details, and edit their name. Edited names are saved to localStorage so they survive a reload.

## Run

Needs Node 18+.

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Notes

- Data comes from `https://jsonplaceholder.typicode.com/users`. There's a loading and error state (with retry).
- Search matches name or email, case insensitive.
- The city filter options come from the loaded data, not a hardcoded list.
- Only the name is editable. JSONPlaceholder doesn't persist writes, so the edit is local only, saved in localStorage as `userId -> { name }` and merged over the API data on load.
- No tests yet. The filtering/storage logic is in plain functions (`utils/`) so it's easy to test later.
- Plain CSS Modules, no UI or state library. Didn't need them for this.

## Layout

```
src/
  api/        fetch for the users endpoint
  components/ UI (shared/ for generic bits like Modal and Status)
  hooks/      useUsers (fetch state), useUserFilters (search/sort/filter)
  utils/      filters.ts, storage.ts
  types.ts
  App.tsx
```
