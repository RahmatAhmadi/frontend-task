import React, { ElementRef, useEffect, useRef, useState } from "react";
import { fetchSearchSuggestions } from "../../api/searchApi";
import { Link } from "react-router-dom";
import { Suggestion } from "../../types";

export default function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    value = value.trim().toLowerCase();
    setQuery(value);
    setError(false);

    if (value) {
      setIsLoading(true);
      try {
        const data = await fetchSearchSuggestions(value);
        const filteredSuggestions = (data?.RelatedTopics || [])
          .filter((topic: Suggestion) => topic.Text && topic.FirstURL)
          .map((topic: Suggestion) => ({
            Text: topic.Text,
            FirstURL: topic.FirstURL,
          }));
        setSuggestions(filteredSuggestions);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsLoading(false);
    setError(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <h1 className="text-7xl font-bold mb-8">
        <span className="text-blue-600">S</span>
        <span className="text-red-600">e</span>
        <span className="text-yellow-400">a</span>
        <span className="text-blue-600">r</span>
        <span className="text-green-600">c</span>
        <span className="text-red-600">h</span>
      </h1>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          className={`w-full p-2 px-10 text-lg border rounded-3xl shadow-md transition-all focus-visible:outline-none ${
            suggestions.length > 0 && query
              ? "rounded-bl-none rounded-br-none"
              : ""
          }`}
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
          />
        </svg>
        {query && (
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClear}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      {query && (
        <>
          <div className="absolute top-[149.5px] z-10 w-full bg-white shadow-md rounded-bl-3xl rounded-br-3xl overflow-hidden">
            {!isLoading && !error && suggestions.length > 0 && (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.FirstURL}
                    className="py-2 px-3.5 cursor-pointer hover:bg-gray-200 truncate"
                  >
                    <Link
                      to={`/search-results?q=${query}&url=${suggestion.FirstURL}`}
                    >
                      {suggestion.Text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {!isLoading && !error && suggestions.length === 0 && (
            <div className="p-2 text-center">
              <p>No suggestions found</p>
            </div>
          )}
          {isLoading && (
            <div className="p-2 text-center">
              <p>Loading...</p>
            </div>
          )}
          {error && (
            <div className="p-2 text-center text-red-500">
              <p>Failed to fetch suggestions. Please try again.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
