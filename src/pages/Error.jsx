import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ErrorPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
