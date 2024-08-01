import axios from "axios";

const API_URL =
  "https://api.duckduckgo.com/?callback=&format=json&no_html=&no_redirect=&skip_disambig=&q=";

export const fetchSearchSuggestions = async (query: string) => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data;
};
