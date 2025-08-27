# Developer Notes: Filtering & Table UI Implementation

## Tech Stacks and Packages
- React
- TypeScript
- Vite
- TanStack Table
- TanStack Router
- TanStack Query
- shadcn/ui

## Approach
- Used Tanstack Table for the Data Table implementation.
- Implemented a user table with expandable rows using a reusable `ExpandableDataTable` component.
- `UserExpandableContent` component displays additional user information when a row is expanded.
- Added filter UI above the table: search input (debounced), city and company dropdowns (shadcn Select), and a "Clear All" button.
- Filtering logic uses AND combination: all active filters must match for a row to be shown.
- Used `useDebouncedValue` hook for real-time but performant search.
- Extracted unique city and company options from the user data for dropdowns.
- UI components (Input, Select, Button) are consistent with the shadcn/ui design system.
- use TanStack Router for managing routes and navigation within the app.
- use TanStack Query for data fetching and caching.

## Assumptions
- All users have `address.city` and `company.name` fields (as per `IUser` type).
- The data provided by `useUsers` is always an array (empty if loading or error).
- Filtering is performed client-side for the current dataset.
- The codebase uses TypeScript and shadcn/ui components for UI consistency.
- No server-side filtering or pagination is required for this implementation.

## What can we do for improvement in future
- Implement server-side filtering and pagination for better performance with large datasets.
- Implement Live Query Feature
- Implement Selectable Rows
- Implement Columns Visibility
- Implement Columns Sortable either in client side or server side