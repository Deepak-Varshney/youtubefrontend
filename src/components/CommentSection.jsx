import React, { useState } from 'react';
import { format } from 'timeago.js';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { IoTrashBinSharp } from 'react-icons/io5';

const CommentSection = ({ comments, videoId, currentUser, fetchVideoDetails }) => {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const { theme } = useTheme();

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const res = await axios.post(`/api/comments/add/${videoId}/`, { message: newComment });
        fetchVideoDetails();
        setNewComment("");
        setIsCommenting(false);
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment!");
      }
    }
  };

  const handleCancelComment = () => {
    setNewComment("");
    setIsCommenting(false);
  };

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
  };

  const handleUpdateComment = async (commentId) => {
    if (editingCommentText.trim()) {
      try {
        await axios.put(`/api/comments/edit/${commentId}`, { message: editingCommentText });
        fetchVideoDetails();
        setEditingCommentId(null);
        setEditingCommentText("");
        toast.success("Comment updated successfully!");
      } catch (error) {
        console.error("Error updating comment:", error);
        toast.error("Failed to update comment!");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/delete/${commentId}`);
      fetchVideoDetails();
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment!");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {currentUser && (
        <div className="mb-4">
          <img
            src={currentUser?.profilePicture}
            alt="User"
            className="w-10 h-10 object-cover rounded-full inline-block mr-2 shadow-md"
          />
          <input
            type="text"
            placeholder="Add a public comment..."
            className={`border-none outline-none rounded-lg p-2 w-full shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-800'}`}
            value={newComment}
            onChange={handleCommentChange}
            onFocus={() => setIsCommenting(true)}
          />
          <hr className="border border-gray-700" />
          {isCommenting && (
            <div className="flex justify-end mt-2">
              <button
                onClick={handleCancelComment}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2 shadow-md hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start mb-4">
           <Link to={`/profile/${comment?.user?._id}`}>
           <img
              src={comment?.user?.profilePicture}
              alt={comment?.user?.username}
              className="w-10 h-10 object-cover rounded-full mr-2 shadow-md"
            />
           </Link>
            <div className="flex-1">
              {editingCommentId === comment._id ? (
                <div className={`p-2 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
                  <textarea
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    className={`w-full p-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2 shadow-md hover:bg-gray-400 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`p-2 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
                  <h3 className="font-bold">{comment?.user?.channelName}</h3>
                  <h4 className="font-semibold">@{comment?.user?.username}</h4>
                  <p>{comment?.message}</p>
                  {(currentUser?._id === comment?.user?._id) && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditComment(comment._id, comment.message)}
                        className="text-blue-500 hover:underline"
                      ><CiEdit />

                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:underline"
                      >
                        <IoTrashBinSharp/>
                      </button>
                    </div>
                  )}
                </div>
              )}
              <span className="text-gray-600 text-sm">{format(comment?.createdAt)}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600">No comments yet. Be the first to comment!</div>
      )}
    </div>
  );
};

export default CommentSection;
