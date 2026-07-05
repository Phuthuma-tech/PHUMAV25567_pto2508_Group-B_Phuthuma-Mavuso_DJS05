import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShowListQuery } from "../hooks/useShowListQuery.js";
import Filters from "../components/Filters/Filters.jsx";
import ShowGrid from "../components/ShowGrid/ShowGrid.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import { LoadingState, ErrorState, EmptyState } from "../components/StatusStates/StatusStates.jsx";

/** sessionStorage key used to remember the last homepage URL (path + query). */
export const LAST_HOME_URL_KEY = "podcastExplorer:lastHomeUrl";

/**
 * Homepage/listing page: search, filter, sort, paginate, and browse to
 * individual show detail pages.
 *
 * Filter/search/sort/page state lives in the URL query string (see
 * `useShowListQuery`), and this component also mirrors the current
 * location into sessionStorage. That gives the show detail page a
 * reliable "back to shows" target even if the user arrived at a show
 * page directly (e.g. a shared link) rather than via browser navigation.
 *
 * @returns {JSX.Element}
 */
export default function HomePage() {
  const location = useLocation();
  const {
    shows,
    totalCount,
    totalPages,
    isLoading,
    error,
    search,
    genre,
    sort,
    page,
    setSearch,
    setGenre,
    setSort,
    setPage,
  } = useShowListQuery();

  useEffect(() => {
    sessionStorage.setItem(LAST_HOME_URL_KEY, `${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return (
    <section>
      <h1 className="visually-hidden">Podcast shows</h1>

      <Filters
        search={search}
        genre={genre}
        sort={sort}
        onSearchChange={setSearch}
        onGenreChange={setGenre}
        onSortChange={setSort}
      />

      {isLoading && <LoadingState label="Loading shows…" />}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      )}

      {!isLoading && !error && totalCount === 0 && (
        <EmptyState
          title="No shows match your search"
          message="Try a different search term or clear your filters."
        />
      )}

      {!isLoading && !error && totalCount > 0 && (
        <>
          <ShowGrid shows={shows} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  );
}
