import { GENRE_TITLES } from "../../utils/genres.js";
import "./Filters.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Recently updated" },
  { value: "oldest", label: "Least recently updated" },
  { value: "az", label: "Title A–Z" },
  { value: "za", label: "Title Z–A" },
];

/**
 * Controls for searching, filtering by genre, and sorting the show list.
 * All values are lifted state, driven by `useShowListQuery`, so that they
 * stay in sync with the URL and survive navigation to a show and back.
 *
 * @param {{
 *   search: string,
 *   genre: string,
 *   sort: string,
 *   onSearchChange: (value: string) => void,
 *   onGenreChange: (value: string) => void,
 *   onSortChange: (value: string) => void,
 * }} props
 * @returns {JSX.Element}
 */
export default function Filters({ search, genre, sort, onSearchChange, onGenreChange, onSortChange }) {
  return (
    <div className="filters">
      <label className="filters__search">
        <span className="visually-hidden">Search shows by title</span>
        <input
          type="search"
          placeholder="Search shows…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="filters__field">
        <span className="filters__label">Genre</span>
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option value="all">All genres</option>
          {Object.entries(GENRE_TITLES).map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </label>

      <label className="filters__field">
        <span className="filters__label">Sort</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
