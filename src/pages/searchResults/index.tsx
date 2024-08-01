import SearchResults from "../../components/SearchResults";
import { useNavigation } from "react-router-dom";

export default function SearchResultsPage() {
  const navigation = useNavigation();

  return (
    <div className="w-4/5">
      {navigation.state === "loading" && (
        <div className="text-center p-4">
          <p>Loading...</p>
        </div>
      )}
      <SearchResults />
    </div>
  );
}
