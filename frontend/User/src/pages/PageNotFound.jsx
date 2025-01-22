import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="/pageNotFound.webp" alt="Page Not Found" className="max-w-xs md:max-w-md mb-8" />
      <p className="text-xl text-center text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-lg text-blue-500 hover:underline">
        Go Back Home
      </Link>
    </div>
  );
}
