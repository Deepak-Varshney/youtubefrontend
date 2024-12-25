import React from 'react';
import { Link } from 'react-router-dom';

const ChannelInfo = ({ video, subscribed, handleSubscribe, handleUnsubscribe }) => {
  return (
    <div className="flex items-center gap-4 mt-4 pb-4 border-b">
      <Link to={`/profile/${video?.user?._id}`}>
        <img
          src={video?.user?.profilePicture}
          alt={video?.user?.username}
          className="w-12 h-12 object-cover rounded-full shadow-md"
        />
      </Link>
      <Link to={`/profile/${video?.user?._id}`}>
        <div>
          <h2 className="font-bold">{video?.user?.channelName}</h2>
          <h3 className="font-semibold">@{video?.user?.username}</h3>
          <p className="text-gray-600">{video?.user?.subscribers || 0} Subscribers</p>
        </div>
      </Link>

      {subscribed ? (
        <button onClick={handleUnsubscribe} className="ml-auto bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-200">
          Unsubscribe
        </button>
      ) : (
        <button onClick={handleSubscribe} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-200">
          Subscribe
        </button>
      )}
    </div>
  );
};

export default ChannelInfo;
