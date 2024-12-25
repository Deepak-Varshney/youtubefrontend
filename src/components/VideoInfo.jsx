import React from 'react';
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { abbreviateNumber } from "js-abbreviation-number";
import { format } from "timeago.js";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const VideoInfo = ({ video, liked, disliked, handleLike, handleDislike, showFullDescription, toggleDescription }) => {
  const { theme } = useTheme();

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">{video?.title}</h1>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-600">{video?.views} views • {format(video?.createdAt)}</span>
        <div className="flex gap-4">
          <button onClick={handleLike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
            {liked ? <BiSolidLike className="text-xl" /> : <BiLike className="text-xl" />}
            <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
          </button>

          <button onClick={handleDislike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
            {disliked ? <BiSolidDislike className="text-xl" /> : <BiDislike className="text-xl" />}
            <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
          </button>
          <button className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className={`mt-4 p-4 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
        <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {video?.description}
        </p>
        <button
          onClick={toggleDescription}
          className="flex items-center text-blue-500 mt-2 hover:underline"
        >
          {showFullDescription ? (
            <>
              Show Less <MdOutlineExpandLess className="ml-1" />
            </>
          ) : (
            <>
              Show More <MdOutlineExpandMore className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
