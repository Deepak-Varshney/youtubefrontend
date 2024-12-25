import React, { useState } from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfileHeader = ({ profileData, currentUser, userId, handleSubscribe, handleUnsubscribe, fetchProfile }) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    channelName: profileData.channelName,
    about: profileData.about,
    profilePicture: profileData.profilePicture,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/api/users/profile/update`, editData);
      fetchProfile();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      channelName: profileData.channelName,
      about: profileData.about,
      profilePicture: profileData.profilePicture,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube');
    data.append('cloud_name', 'dshog03l1');
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dshog03l1/image/upload', data);
      setEditData({ ...editData, profilePicture: res.data.url });
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload profile picture!');
    }
  };

  return (
    <div className={`shadow-lg relative rounded-lg top-12 p-6 max-w-4xl mx-auto mt-6 transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      <div className="flex items-center space-x-4">
        <img
          src={editData.profilePicture}
          alt={`${profileData.username}'s profile`}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="channelName"
                value={editData.channelName}
                onChange={handleEditChange}
                className={`w-full p-2 rounded mt-1 outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
              <textarea
                name="about"
                value={editData.about}
                onChange={handleEditChange}
                className={`w-full p-2 rounded mt-1 outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className={`w-full p-2 rounded mt-1 outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
              <div className="mt-4 space-x-4">
                <button
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{profileData.channelName}</h1>
              <h2 className="text-xl font-semibold">{abbreviateNumber(profileData.subscribers)} Subscribers</h2>
              <p className="text-sm">@{profileData.username}</p>
              <p className="mt-2">{profileData.about}</p>
              <div className="mt-4 space-x-4">
                {currentUser && currentUser._id === userId && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                  >
                    Edit Profile
                  </button>
                )}
                {currentUser && currentUser._id !== userId && (
                  <>
                    {currentUser && currentUser.subscribedTo.includes(userId) ? (
                      <button
                        onClick={handleUnsubscribe}
                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        onClick={handleSubscribe}
                        className="bg-[red] text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
                      >
                        Subscribe
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">Email: {profileData.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
