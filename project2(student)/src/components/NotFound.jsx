import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-desc">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="notfound-btn">Go Home</Link>
    </div>
  );
}

export default NotFound;
