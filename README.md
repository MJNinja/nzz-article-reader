# NZZ Article Reader

A simplified article reading experience inspired by NZZ (Neue Zürcher Zeitung), built as a frontend take-home project.

The app provides a paginated article feed, full article detail view, topic filtering, search, and bookmarking — with a strong focus on accessibility, state management via URL, and testable UI behavior.

## 🚀 What I built

### 1. Article Feed (`/`)
- Paginated article feed with **Load More** behaviour
- Each article card shows:
  - Title + lead
  - Author
  - Hero image (if available)
  - Relative publish time
  - Topic chips
  - Premium badge
- Clicking an article navigates to the detail page
- Feed state (pagination + filters) is preserved via URL

### 2. Article Detail (`/article/:id`)
- Full article view (title, lead, body, author, image, topics)
- Bookmark toggle with **localStorage persistence**
- Share button (copies deep link to clipboard)
- Related articles (based on shared topics)
- Back navigation preserves feed state and scroll position

**UX improvements:**
- Scroll restoration handled so returning to feed preserves position
- Prefetching related data on hover for faster navigation
- Accessibility focus management for dynamic content (load more interactions)

### 3. Topic Filtering
- Multi-topic filtering on the feed
- Filter state is reflected in the URL
- Fully shareable and reload-safe

### 4. Search (`/search?q=...`)
- Debounced free-text search across title, lead, and body
- Query is synced with URL
- Results are:
  - **Sorted by newest first**
  - Rendered with loading / error / empty states
- Clear empty state when no results exist

### 5. Bookmarks (`/bookmarks`)
- List of bookmarked articles (newest-first)
- Persistent across reloads via localStorage
- Syncs across open tabs
- Empty, loading, and error states handled

### 6. Responsive + Theming
- Mobile-first layout (tested down to 375px)
- Desktop optimised (up to 1280px+)
- Supports `prefers-color-scheme` (light/dark) without a manual toggle

## 🧪 Testing Strategy

Built with **Vitest + React Testing Library**, focusing on testing from a **user’s perspective** rather than implementation details.

The goal was not to maximise coverage, but to make sure the **important user flows actually work and don’t break easily**.

### What is tested

**Feed**
- Filtering state is synced with the URL
- Pagination / load more behaviour
- Basic rendering of articles

**Search**
- Loading, error, and empty states
- Input updates correctly and syncs with URL
- Results render correctly in the UI
- Results are sorted by newest first

**Bookmarks**
- Adding/removing bookmarks works
- Empty, loading, and error states
- Bookmarks persist across reloads (localStorage)
- Bookmarked state is correctly reflected in the UI

**ArticleCard**
- Renders correct article information (title, author, topics, etc.)
- Bookmark state is shown correctly
- Prefetch behaviour on hover/focus improves perceived performance

**Accessibility + interaction flows**
- Keyboard navigation works through key UI parts
- Focus behaves correctly after dynamic updates (e.g. load more)
- Skip-to-content link works as expected

## 🧱 Key technical decisions

### React Query for data fetching
Used for caching, request deduplication, and clean async state handling.

### URL as source of truth
- Search and filters are fully URL-driven
- Enables shareable and reload-safe UI state

### localStorage for bookmarks
- Simple persistent client-side store
- Extended with sync across tabs

## 🧯 Issues encountered & fixes

### React Router issues in tests
Some components using `<Link>` or router hooks failed in tests.

- **Problem:** Components crashed because they were missing router context
- **Fix:** Wrapped test renders in `MemoryRouter`

### React Query context missing in tests
- **Problem:** Tests failed with “No QueryClient set”
- **Fix:** Created a shared `renderWithProviders` helper that wraps everything in `QueryClientProvider`

### localStorage issues in test environment
- **Problem:** Bookmark logic broke in Vitest because `localStorage` wasn’t available
- **Fix:** Mocked `localStorage` in test setup

### ArticleCard data shape issues
- **Problem:** Tests failed because mocked articles were missing required fields
- **Fix:** Updated mock data to match real API shape (topics, author, image, etc.)

### Async UI timing issues
- **Problem:** Some tests failed intermittently due to timing (especially focus and navigation)
- **Fix:** Used `waitFor` / `findBy` to ensure DOM updates were complete before asserting

## ⚡ Performance improvements

The focus here was mostly on **perceived performance and user experience**, rather than heavy optimisation.

- **Image optimisation**
  - Used appropriate image sizes where possible
  - Added lazy loading for images that are not immediately visible
  - Set width/height to avoid layout shifts (CLS improvements)

- **Prefetching content**
  - Article data is prefetched on hover/focus of cards
  - This makes navigation to the article detail feel instant in most cases

- **Debounced search input**
  - Search requests are debounced to avoid unnecessary API calls while typing
  - Helps reduce load on the mock API and improves UI responsiveness

- **React Query caching**
  - React Query is used to avoid refetching the same data unnecessarily
  - Improves navigation speed between repeated views (feed / article / search)

## 🧾 What I intentionally skipped / simplified

- Offline support (service worker, caching strategies)
- Virtualised feed (not needed for the size of the dataset)
- Advanced backend caching strategies beyond React Query defaults

## 🚀 If I had 2 more days

- Add full **offline-first mode** (service worker + cache fallback)
- Improve **feed performance with virtualization**
- Add **animation / reduced-motion support improvements**
- Expand test coverage to include full **end-to-end user journeys**
- Add a proper **404 + error boundary page**
- Improve accessibility audit (screen reader walkthrough + ARIA refinement)

## 🧠 One thing done really well

I focused a lot on making the app feel **fast and predictable**, especially through:

- URL-driven state (search + filters are shareable and reload-safe)
- Prefetching article data to make navigation feel instant
- Clean loading / empty / error states everywhere

On top of that, I also spent extra time making the UI **as accessible as possible**, including:
- Keyboard navigation support
- Visible focus states
- Skip-to-content behaviour
- Careful handling of dynamic focus changes (e.g. load more)

## 📦 Stack

- React + TypeScript (strict mode)
- React Router
- React Query
- Vitest + React Testing Library
- Vite