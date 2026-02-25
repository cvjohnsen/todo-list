import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2>Page not found</h2>
      <p>Sorry, we couldn’t find that page.</p>
      <Link to="/">← Back to Home</Link>
    </>
  );
}