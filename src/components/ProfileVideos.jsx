import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { abbreviateNumber } from 'js-abbreviation-number';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileVideos = ({ videos }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/api/videos/delete/${videoId}`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      toast.success('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl mt-16 font-semibold">Recent Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="relative shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <Link to={`/video/${video._id}`}>
                <div className="h-24 md:h-32 rounded-xl overflow-hidden">
                  <img src={video?.thumbnail} alt="" className="w-full object-fill" />
                </div>
                <div className="flex mt-3 space-x-2">
                  <div className="flex items-start">
                    <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                      <img
                        className="w-full h-full rounded-full object-cover overflow-hidden"
                        src={video?.user?.profilePicture}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold line-clamp-1">{video?.title}</span>
                    <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-600">
                      {video?.author?.title}
                    </span>
                    <div className="flex text-gray-500 text-[12px]">
                      <span>{`${abbreviateNumber(video?.views, 2)} Views`}</span>
                      <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">.</span>
                      <span>{format(video?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
              {currentUser?._id === video.user._id && (
                <button
                  onClick={() => handleDelete(video._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileVideos;
