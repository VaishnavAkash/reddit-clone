import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Comment = ({comment}) => {

  return (
    <div className="comment">
      <div className="comment-header">
        <p>{comment.content}</p>
        <p>Author: {comment.author}</p>
        {/* Display other comment details as needed */}
      </div>

      {comment.children.length > 0 && (
        <div className="nested-comments ml-8">
          {/* Recursive call to display nested comments */}
          {comment.children.map((childComment) => (
            <Comment key={childComment._id} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsList = () => {
  const commentsArray = useSelector(store=>store.homeSlice.commentPageData.comments); 

  return (
    <div className="comment-container">
      {/* Loop through top-level comments */}
      {commentsArray.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
