import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { format } from 'timeago.js';

const SuggestedVideo = ({ video }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/video/${video._id}`} className="flex mb-4">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-40 h-24 object-cover rounded-lg"
      />
      <div className="ml-4">
        <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {video.title}
        </h3>
        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {video.channelName}
        </p>
        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {video.views} views • {format(video.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default SuggestedVideo;