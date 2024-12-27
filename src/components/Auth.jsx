import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useTheme } from "../context/ThemeContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    channelName: '',
    about: '',
    profilePicture: ''
  });
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube');
    data.append('cloud_name', 'dshog03l1');
    try {
      setLoading(true);
      const res = await axios.post('https:/https://myyoutube-0non.onrender.com/api.cloudinary.com/v1_1/dshog03l1/image/upload', data, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progressPercentage);
        }
      });
      setFormData({ ...formData, profilePicture: res.data.url });
      setLoading(false);
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to upload profile picture!');
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(true);
    setError('');

    const url = isSignup ? 'https://myyoutube-0non.onrender.com/api/auth/signup' : 'https://myyoutube-0non.onrender.com/api/auth/signin';

    try {
      const res = await axios.post(url, formData, {
        withCredentials: true, // Allow sending and receiving cookies
      });
      dispatch(loginSuccess(res.data.others));
      setProgress(0);
      toast.success(isSignup ? 'Signup successful!' : 'Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setProgress(0);
      dispatch(loginFailure());
      toast.error('Authentication failed!');
    } finally {
      setLoading(false);
    }
  };

  // Toggle between signup and login forms
  const toggleForm = () => {
    setIsSignup((prevState) => !prevState);
  };

  return (
    <div
      className={`max-w-sm mx-auto p-6 shadow-lg rounded-lg mt-24 mb-24 transition-all duration-300 
      ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-800'}`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 rounded mt-1 outline-none 
            ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {isSignup && (
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded mt-1 outline-none 
              ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="password"
            className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 rounded mt-1 outline-none 
            ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
            required
          />
        </div>

        {isSignup && (
          <>
            <div className="mb-4">
              <label
                htmlFor="channelName"
                className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
              >
                Channel Name
              </label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                className={`w-full p-2 rounded mt-1 outline-none 
                ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="about"
                className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
              >
                About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className={`w-full p-2 rounded mt-1 outline-none 
                ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="profilePicture"
                className={`block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
              >
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                name="profilePicture"
                onChange={(e) => uploadImage(e)}
                className={`w-full p-2 rounded mt-1 outline-none 
                ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
            </div>
          </>
        )}

        {loading && (
          <div className="mb-4">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Uploading... {progress}%
            </p>
          </div>
        )}

        <button
          type="submit"
          className={`w-full p-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} 
          ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'} transition-all`}
          disabled={loading}
        >
          {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : (isSignup ? 'Sign Up' : 'Log In')}
        </button>
      </form>

      <p className="text-center mt-4">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={toggleForm}
          className={`ml-1 font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
        >
          {isSignup ? 'Log in now' : 'Sign up now'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
