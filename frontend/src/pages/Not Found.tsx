import { Link } from "react-router";

const NotFound = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white py-2 px-6 rounded-lg shadow-md cursor-pointer"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
