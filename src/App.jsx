import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShowDetailPage from "./pages/ShowDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/**
 * Application shell: persistent header plus the routed page content.
 *
 * Routes:
 *  - `/`            → HomePage (listing, search, filter, sort, pagination)
 *  - `/show/:showId` → ShowDetailPage (dynamic per-show detail route)
 *  - `*`            → NotFoundPage
 *
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:showId" element={<ShowDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
