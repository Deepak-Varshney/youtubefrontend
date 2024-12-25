import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ListItems({ onCategoryClick, selectedCategory}) {
  const categories = [
    "All", "Music", "Gaming", "Movies", "News", "Live", "Fashion", "Learning", "Sports",
    "360 Video", "Browse channels", "Comedy", "Hindi", "Trending", "History", "Science",
    "Technology", "Travel", "Browse channels"
  ];
    const { theme } = useTheme();

  return (
    <div
      className={`flex overflow-x-auto hide-scrollbar px-4 py-2 ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-gray-100"
      }`}
    >
      <div className="flex space-x-4 flex-nowrap">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => onCategoryClick(category)} // Trigger category change on click
            className={`flex-none rounded-xl px-4 py-2 font-medium cursor-pointer flex duration-300 ${
              selectedCategory === category
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : theme === "dark"
                ? "bg-[#2a2a2a] text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListItems;
