import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useTheme } from '../context/ThemeContext';

const UploadVideoModal = ({ isOpen, toggleModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoLink: '',
    thumbnail: '',
    type: '',
    tags: '' // Add tags field
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const [uploadSource, setUploadSource] = useState(null);

  const handleChange = (e, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value
    }));
  };

  const handleFileUpload = async (e, type) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube');
    data.append('cloud_name', 'dshog03l1');

    try {
      setLoading(true);
      setUploadSource(type);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dshog03l1/${type}/upload`, data,
        {
          onUploadProgress: (progressEvent) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercentage);
          }
        }
      );
      setLoading(false);
      setProgress(0);
      let val = type === 'video' ? 'videoLink' : 'thumbnail';
      setFormData({ ...formData, [val]: response.data.url });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (error) {
      setLoading(false);
      setProgress(0);
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file!');
    }
  };

  const handleCancelUpload = () => {
    setLoading(false);
    setProgress(0);
    setUploadSource(null);
    toast.info('Upload cancelled.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, tags: formData.tags.split(',').map(tag => tag.trim()) }; // Convert tags to array
    try {
      const response = await axios.post('/api/videos/upload', data);
      if (response.status === 201) {
        toast.success('Video uploaded successfully!');
        toggleModal(); // Close modal after successful submission
      }
    } catch (error) {
      console.error('Error uploading video data:', error);
      toast.error('Failed to upload video!');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
        <div className={`p-6 rounded-lg max-h-[80vh] overflow-scroll w-[400px] relative transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-800'}`}>
          <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange(e, 'title')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="videoType" className="block font-medium">Category</label>
              <input
                type="text"
                id="videoType"
                name="videoType"
                value={formData.videoType}
                onChange={(e) => handleChange(e, 'videoType')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange(e, 'description')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="block font-medium">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={(e) => handleChange(e, 'tags')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="videoFile" className="block font-medium">Video File</label>
              <input
                type="file"
                id="videoFile"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
              {formData.videoLink && (
                <button
                  type="button"
                  onClick={() => document.getElementById('videoFile').click()}
                  className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                  Change Video
                </button>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="thumbnailFile" className="block font-medium">Thumbnail Image</label>
              <input
                type="file"
                id="thumbnailFile"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                className={`w-full p-3 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
              />
              {formData.thumbnail && (
                <button
                  type="button"
                  onClick={() => document.getElementById('thumbnailFile').click()}
                  className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                  Change Thumbnail
                </button>
              )}
            </div>

            {loading && (
              <div className="mb-4">
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">Uploading... {progress}%</p>
                <button
                  type="button"
                  onClick={handleCancelUpload}
                  className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-600 transition-all duration-200"
                >
                  Cancel Upload
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'} transition-all`}
              disabled={loading}
            >
              Submit
            </button>
          </form>

          <button
            className="absolute top-2 right-2 text-xl"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
};

export default UploadVideoModal;
