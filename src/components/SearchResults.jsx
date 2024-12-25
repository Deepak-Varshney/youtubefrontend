import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Video from '../pages/Video';
import { ThreeDots } from 'react-loader-spinner'; // Import loader component
import { useTheme } from '../context/ThemeContext'; // Import theme context

const SearchResults = () => {
  const { search } = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { theme } = useTheme(); 

  const searchQuery = new URLSearchParams(search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true); // Set loading to true when the request starts
        const response = await axios.get(`/api/videos/search?q=${searchQuery}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div
      className={`relative top-16 min-h-full p-4 transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#181818] text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 text-gradient ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      >
        Search Results for "{searchQuery}"
      </h1>

      {/* Show loader while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center my-16">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#FF0000"  // YouTube red color
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((video) => (
            
                <Video key={video._id} video={video} />
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
