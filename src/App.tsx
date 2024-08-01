import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { searchResultsLoader } from "./components/SearchResults";
import SearchPage from "./pages/search";
import SearchResultsPage from "./pages/searchResults";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search-results",
    element: <SearchResultsPage />,
    loader: searchResultsLoader,
  },
]);

function App() {
  return (
    <main className="min-h-screen flex items-start justify-center pt-20">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
