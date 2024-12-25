import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscription } from "../redux/userSlice";
import SuggestedVideo from "../components/SuggestedVideo";
import CommentSection from "../components/CommentSection";
import VideoInfo from "../components/VideoInfo";
import ChannelInfo from "../components/ChannelInfo";

function PlayingVideo() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideoDetails();
    if (currentUser) {
      increaseViewCount();
    }
  }, [id]);

  useEffect(() => {
    if (video?.tags) {
      fetchRelatedVideos(video.tags);
    }
  }, [video]);

  const fetchVideoDetails = async () => {
    try {
      const res = await axios.get(`https://myyoutube-0non.onrender.com/api/videos/find/${id}`);
      setVideo(res.data.video);
      const commentsRes = await axios.get(`https://myyoutube-0non.onrender.com/api/comments/video/${id}`);
      setComments(commentsRes.data.comments);
      setLiked(res.data.video.likes.includes(currentUser?._id));
      setDisliked(res.data.video.dislikes.includes(currentUser?._id));
      setSubscribed(currentUser?.subscribedTo.includes(res.data.video.user._id));
    } catch (error) {
      console.error("Error fetching video details:", error);
      toast.error("Failed to fetch video details!");
      navigate('/error');
    }
  };

  const fetchRelatedVideos = async (tags) => {
    try {
      const res = await axios.get(`https://myyoutube-0non.onrender.com/api/videos/tags?tags=${tags.join(',')}`);
      setRelatedVideos(res.data.videos);
    } catch (error) {
      console.error("Error fetching related videos:", error);
      toast.error("Failed to fetch related videos!");
    }
  };

  const increaseViewCount = async () => {
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/videos/view/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser?.token}` } });
    } catch (error) {
      console.error("Error increasing view count:", error);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Login to like a video");
      return;
    }
    if (liked) return; // Already liked, no need to send request
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/videos/like/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser?.token}` } });
      setLiked(true);
      setDisliked(false); // Ensure dislike is reset if liked
      toast.success("Video liked!");
      setVideo(prevVideo => ({
        ...prevVideo,
        likes: [...prevVideo.likes, currentUser?._id], // Update the like count locally
        dislikes: prevVideo.dislikes.filter(userId => userId !== currentUser?._id) // Remove user from dislikes
      }));
    } catch (err) {
      console.error("Error liking video", err);
      toast.error("Failed to like video!");
    }
  };

  const handleDislike = async () => {
    if (!currentUser) {
      toast.error("Login to dislike a video");
      return;
    }
    if (disliked) return; // Already disliked, no need to send request
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/videos/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser?.token}` } });
      setDisliked(true);
      setLiked(false); // Ensure like is reset if disliked
      toast.success("Video disliked!");
      setVideo(prevVideo => ({
        ...prevVideo,
        dislikes: [...prevVideo.dislikes, currentUser?._id], // Update the dislike count locally
        likes: prevVideo.likes.filter(userId => userId !== currentUser?._id) // Remove user from likes
      }));
    } catch (err) {
      console.error("Error disliking video", err);
      toast.error("Failed to dislike video!");
    }
  };

  const handleSubscribe = async () => {
    if (!currentUser) {
      toast.error("Login to subscribe to a channel");
      return;
    }
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/users/subscribe/${video?.user?._id}`, {}, { headers: { Authorization: `Bearer ${currentUser?.token}` } });
      dispatch(subscription(video?.user?._id));
      setSubscribed(true);
      setVideo(prevVideo => ({
        ...prevVideo,
        user: {
          ...prevVideo.user,
          subscribers: prevVideo.user.subscribers + 1 // Increment subscriber count locally
        }
      }));
      toast.success("Subscribed to channel!");
    } catch (err) {
      console.error("Error subscribing", err);
      toast.error("Failed to subscribe!");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/users/unsubscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser?.token}` } });
      dispatch(subscription(video?.user?._id));
      setSubscribed(false);
      setVideo(prevVideo => ({
        ...prevVideo,
        user: {
          ...prevVideo.user,
          subscribers: prevVideo.user.subscribers - 1 // Decrement subscriber count locally
        }
      }));
      toast.success("Unsubscribed from channel!");
    } catch (err) {
      console.error("Error unsubscribing", err);
      toast.error("Failed to unsubscribe!");
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-4 p-4 mt-12 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      {/* Left column - Video Player and Info */}
      <div className="lg:w-8/12">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black shadow-lg rounded-lg overflow-hidden">
          <ReactPlayer
            url={`${video?.videoLink}` || ""}
            height="100%"
            width="100%"
            controls
            style={{ backgroundColor: "#000000" }}
            playing={true}
          />
        </div>

        {/* Video Info */}
        <VideoInfo
          video={video}
          liked={liked}
          disliked={disliked}
          handleLike={handleLike}
          handleDislike={handleDislike}
          showFullDescription={showFullDescription}
          toggleDescription={toggleDescription}
        />

        {/* Channel Info */}
        <ChannelInfo
          video={video}
          subscribed={subscribed}
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}
        />

        {/* Comments Section */}
        <CommentSection
          comments={comments}
          videoId={id}
          currentUser={currentUser}
          fetchVideoDetails={fetchVideoDetails}
        />
      </div>

      {/* Right column - Related Videos */}
      <div className="lg:w-4/12">
        <h2 className="text-lg font-bold mb-4">Related Videos</h2>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((item, index) => (
            <SuggestedVideo key={index} video={item} />
          ))
        ) : (
          <div className="text-gray-600">Related videos are coming soon...</div>
        )}
      </div>
    </div>
  );
}

export default PlayingVideo;
