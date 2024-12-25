import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscription } from '../redux/userSlice';
import ProfileHeader from '../components/ProfileHeader';
import ProfileVideos from '../components/ProfileVideos';
import UploadVideoModal from '../components/Upload';

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [profileData, setProfileData] = useState({
    channelName: '',
    username: '',
    about: '',
    email: '',
    profilePicture: '',
    subscribers: 0,
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editVideoData, setEditVideoData] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://myyoutube-0non.onrender.com/api/users/profile/${userId}`);
      const data = response.data;
      setProfileData({
        channelName: data.channelName,
        username: data.username,
        about: data.about,
        email: data.email,
        profilePicture: data.profilePicture,
        subscribers: data.subscribers,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`https://myyoutube-0non.onrender.com/api/videos/channel/${userId}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [userId]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.put(`https://myyoutube-0non.onrender.com/api/users/subscribe/${userId}`);
      if (response.status === 200) {
        dispatch(subscription(userId));
        setProfileData(prev => ({
          ...prev,
          subscribers: prev.subscribers + 1,
        }));
        toast.success('Subscription successful!');
      }
    } catch (error) {
      toast.error('Error subscribing!');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.put(`https://myyoutube-0non.onrender.com/api/users/unsubscribe/${userId}`);
      if (response.status === 200) {
        dispatch(subscription(userId));
        setProfileData(prev => ({
          ...prev,
          subscribers: prev.subscribers - 1,
        }));
        toast.success('Unsubscription successful!');
      }
    } catch (error) {
      toast.error('Error unsubscribing!');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    confirm('Are you sure you want to delete this video?');
    try {
      await axios.delete(`https://myyoutube-0non.onrender.com/api/videos/delete/${videoId}`);
      setVideos(videos.filter(video => video._id !== videoId));
      toast.success('Video deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete video!');
    }
  };

  const handleEditVideo = (video) => {
    setEditVideoData(video);
    setIsEditModalOpen(true);
  };

  const handleUpdateVideo = async (videoId, updatedData) => {
    try {
      await axios.put(`https://myyoutube-0non.onrender.com/api/videos/edit/${videoId}`, updatedData);
      setVideos(videos.map(video => (video._id === videoId ? { ...video, ...updatedData } : video)));
      toast.success('Video updated successfully!');
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error('Failed to update video!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <ProfileHeader
        profileData={profileData}
        currentUser={currentUser}
        userId={userId}
        handleSubscribe={handleSubscribe}
        handleUnsubscribe={handleUnsubscribe}
        fetchProfile={fetchProfile}
      />
      <ProfileVideos videos={videos} handleDeleteVideo={handleDeleteVideo} handleEditVideo={handleEditVideo} currentUser={currentUser} />
      {isEditModalOpen && (
        <UploadVideoModal
          isOpen={isEditModalOpen}
          toggleModal={() => setIsEditModalOpen(false)}
          videoData={editVideoData}
          handleSubmit={handleUpdateVideo}
        />
      )}
    </div>
  );
};

export default Profile;
