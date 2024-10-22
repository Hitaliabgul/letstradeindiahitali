import React, { useState } from 'react';

const DiscussionSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === '') return;

    const comment = {
      id: Date.now(),
      text: newComment,
      likes: 0,
      replies: [],
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment('');
  };

  const handleReplyChange = (event, commentId) => {
    const { value } = event.target;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          newReply: value,
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId && comment.newReply) {
        const newReply = {
          id: Date.now(),
          text: comment.newReply,
          likes: 0,
        };

        return {
          ...comment,
          replies: [...comment.replies, newReply],
          newReply: '',
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleLikeReply = (commentId, replyId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1,
            };
          }
          return reply;
        });

        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Discussion Section</h2>
      <div className="border border-gray-300 rounded p-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-start">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="profile-pic.jpg" // Replace with the user's profile picture URL
                  alt="Profile"
                />
                <div>
                  <p className="font-bold">{comment.text}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="mr-2 text-gray-500 focus:outline-none"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      Like ({comment.likes})
                    </button>
                    <button className="text-gray-500 focus:outline-none">
                      Reply
                    </button>
                  </div>
                  {comment.replies.length > 0 && (
                    <div className="ml-10 mt-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start">
                          <img
                            className="w-8 h-8 rounded-full mr-2"
                            src="profile-pic.jpg" // Replace with the user's profile picture URL
                            alt="Profile"
                          />
                          <div>
                            <p>{reply.text}</p>
                            <div className="flex items-center mt-2">
                              <button
                                className="mr-2 text-gray-500 focus:outline-none"
                                onClick={() =>
                                  handleLikeReply(comment.id, reply.id)
                                }
                              >
                                Like ({reply.likes})
                              </button>
                              <button className="text-gray-500 focus:outline-none">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <form
                    className="mt-2"
                    onSubmit={(e) => handleReplySubmit(e, comment.id)}
                  >
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      rows="2"
                      value={comment.newReply || ''}
                      onChange={(e) => handleReplyChange(e, comment.id)}
                      placeholder="Write a reply..."
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Reply
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      <form className="mt-4" onSubmit={handleCommentSubmit}>
        <label htmlFor="comment" className="block mb-2 font-bold">
          Add a comment:
        </label>
        <textarea
          id="comment"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          rows="4"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiscussionSection;
