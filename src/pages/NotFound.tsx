import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: tried to access:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl/loose opacity-90">
          Oops! Page not found.
        </p>
        <Link to="/oracle" className="underline hover:opacity-80">
        Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;