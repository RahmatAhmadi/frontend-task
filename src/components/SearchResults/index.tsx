import { useLoaderData } from "react-router-dom";
import { fetchSearchSuggestions } from "../../api/searchApi";
import { Suggestion } from "../../types";

// eslint-disable-next-line react-refresh/only-export-components
export const searchResultsLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim().toLowerCase() || "";

  try {
    if (query) {
      const data = await fetchSearchSuggestions(query);
      const filteredResults = (data?.RelatedTopics || [])
        .filter((topic: Suggestion) => topic.Text && topic.FirstURL)
        .map((topic: Suggestion) => ({
          Text: topic.Text,
          FirstURL: topic.FirstURL,
        }));
      return filteredResults;
    }
    return [];
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    return [];
  }
};

export default function SearchResults() {
  const results = useLoaderData() as Array<Suggestion>;

  if (!results || results.length === 0) {
    return (
      <div className="container mx-auto text-center p-4">
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search results:</h2>
      <ul className="list-disc">
        {results.map((result) => (
          <li key={result.FirstURL} className="mb-2">
            <a
              href={result.FirstURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {result.Text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
