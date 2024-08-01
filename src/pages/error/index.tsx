import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-4/5">
      <div className="text-center p-4">
        <p>Could not find this page!</p>
        <p>
          Go to{" "}
          <Link to="/" className="text-blue-500 underline">
            the Home Page
          </Link>
        </p>
      </div>
    </div>
  );
}
