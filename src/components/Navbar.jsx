import React, { useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdMic } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiVideoAddLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import Avatar from 'react-avatar';
import UploadVideoModal from './Upload';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { BsYoutube } from 'react-icons/bs';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = () => {
    if (currentUser) {
      setIsModalOpen(prevState => !prevState);
    } else {
      alert("You need to login first");
      navigate('/auth');
    }
  };

  const handleProfileModal = () => {
    setIsProfileModalOpen(prevState => !prevState);
  };

  const handleProfileNavigation = (userId) => {
    setIsProfileModalOpen(false);
    navigate(`/profile/${userId}`);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/signout');
      dispatch(logout());
      alert(res.data.message);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      console.log(searchQuery);
    }
  };

  return (
    <div
      className={`flex justify-between items-center fixed top-0 w-full px-6 py-3 z-50 shadow-lg transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#0f0f0f] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
      }`}
    >
      {/* Logo and Menu */}
      <Link to="/">
        <div className="flex space-x-4 cursor-pointer items-center">
          <HiOutlineMenu className="text-2xl hover:text-gray-500 dark:hover:text-gray-400 transition duration-200" />
          <BsYoutube className="text-[red] text-4xl animate-pulse" />
          <h1 className="font-extrabold font-serif text-2xl let">YouTube</h1>
        </div>
      </Link>

      {/* Search Bar */}
      <div className="w-[35%] hidden md:flex items-center">
        <form onSubmit={handleSearch} className="w-full flex">
          <div
            className={`w-full px-3 py-2 rounded-l-full border ${
              theme === 'dark' ? 'border-gray-600 text-white' : 'bg-gray-100 border-gray-400 text-gray-800'
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2 border rounded-r-full ${
              theme === 'dark'
                ? 'bg-[#FFFFFF14] border-gray-600 hover:bg-[#ffffff20]'
                : 'bg-gray-100 border-gray-400 hover:bg-gray-200'
            } transition duration-200`}
          >
            <CiSearch size="24px" />
          </button>
        </form>
        <IoMdMic
          size="42px"
          className={`lg:block hidden ml-3 border rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-200 ${
            theme === 'dark'
              ? 'border-gray-600 text-gray-300 bg-[#FFFFFF14] hover:bg-[#ffffff20]'
              : 'border-gray-400 text-gray-700'
          }`}
        />
      </div>

      {/* Right Section */}
      <div className="flex space-x-5 items-center">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full focus:outline-none ${
            theme === 'dark' ? 'bg-[#FFFFFF14] hover:bg-[#ffffff20]' : 'bg-gray-200 hover:bg-gray-300'
          } transition-all duration-300`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <RiVideoAddLine
          onClick={toggleModal}
          className="text-2xl cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 transition duration-200"
        />
        {isModalOpen && <UploadVideoModal toggleModal={toggleModal} isOpen={isModalOpen} />}
        <AiOutlineBell className="text-2xl cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 transition duration-200" />

        {currentUser ? (
          <Avatar
            onClick={handleProfileModal}
            round
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
            name={currentUser?.channelName}
            src={currentUser?.profilePicture}
            size="32"
            textSizeRatio={1.75}
          />
        ) : (
          <Link
            to="/auth"
            className="border flex items-center rounded-md px-2 py-1 border-sky-400 text-sky-400 hover:bg-sky-100 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <button className="px-2">Login</button>
            <MdAccountCircle size="24px" />
          </Link>
        )}

        {isProfileModalOpen && (
          <div
            className={`absolute top-12 right-0 w-64 h-72 border rounded-lg shadow-lg transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#0f0f0f] border-gray-700' : 'bg-white border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center justify-between h-full p-4">
              <Link to={`/profile/${currentUser._id}`} className="mb-4" onClick={() => handleProfileNavigation(currentUser._id)}>
                <Avatar
                  round
                  name={currentUser.channelName}
                  src={currentUser.profilePicture}
                  size="48"
                  textSizeRatio={1.75}
                  className="cursor-pointer"
                />
              </Link>
              <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {currentUser.channelName}
              </h1>
              <h2 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentUser.email}
              </h2>
              <div className="mt-4 w-full flex flex-col space-y-2">
                <button
                  onClick={() => handleProfileNavigation(currentUser._id)}
                  className={`w-full py-2 px-4 text-sm font-medium rounded-md border transition-all ${
                    theme === 'dark'
                      ? 'text-blue-400 border-blue-400 hover:bg-blue-500'
                      : 'text-blue-600 border-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Your Channel
                </button>
                <button
                  onClick={handleLogout}
                  className={`w-full py-2 px-4 text-sm font-medium rounded-md border transition-all ${
                    theme === 'dark'
                      ? 'text-red-400 border-red-400 hover:bg-red-500'
                      : 'text-red-600 border-red-600 hover:bg-red-100'
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
