import { Link } from "react-router-dom";
import { formatUpdatedDate } from "../../utils/formatDate.js";
import "./ShowCard.css";

/**
 * Clickable preview card for a single show, linking to its detail page.
 * The current location (including search/filter/sort/page query params)
 * is preserved automatically since it lives in the URL the user is
 * navigating away from — no extra props are needed here for that.
 *
 * @param {{ show: Object }} props
 * @param {Object} props.show - PREVIEW object, enriched with `genreTitles`.
 * @returns {JSX.Element}
 */
export default function ShowCard({ show }) {
  return (
    <Link to={`/show/${show.id}`} className="show-card">
      <div className="show-card__image-wrap">
        <img src={show.image} alt="" className="show-card__image" loading="lazy" />
      </div>
      <div className="show-card__body">
        <h3 className="show-card__title">{show.title}</h3>
        <p className="show-card__meta">
          {show.seasons} {show.seasons === 1 ? "season" : "seasons"}
        </p>
        {show.genreTitles?.length > 0 && (
          <ul className="show-card__genres">
            {show.genreTitles.slice(0, 3).map((title) => (
              <li key={title} className="show-card__genre-tag">
                {title}
              </li>
            ))}
          </ul>
        )}
        <p className="show-card__updated">Updated {formatUpdatedDate(show.updated)}</p>
      </div>
    </Link>
  );
}
