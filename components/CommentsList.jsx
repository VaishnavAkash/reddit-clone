import { pushAuthorDetails } from '@/slices/homeSlice';
import { getSelector } from '@/utils/helper';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Comment = ({comment,author}) => {

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
const readableDateTime = new Date().toLocaleString('en-US', options);


  return (
    <div className="flex flex-col gap-3">
      <div className="py-1">
        <div className='flex items-center gap-3'>
          <img className='rounded-full h-10 w-10' src={`https://loremflickr.com/320/320?cat=${Math.floor(Math.random()*50)}`} alt="" />
          <div className='flex gap-4'>
            <div>{comment?.author=='Akash' ?comment.author:author}</div>
            <div>{readableDateTime}</div>
          </div>
          </div>
        <div className=' ml-5 border-l-2 border-black'>
        <div className='pl-8'>
          <p>{comment?.content}</p>
        </div>
        {comment?.children?.length > 0 && (
          <div className="pl-12 flex flex-col gap-4">
          {/* Recursive call to display nested comments */}
          {comment.children.map((childComment) => (
            <Comment key={childComment._id} comment={childComment} author={author}/>
            ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

const CommentsList = () => {
  const commentsArray = useSelector(store=>store.homeSlice.commentPageData.comments);
  const namesArray = getSelector('namesArray');
  

  return (
    <div className="comment-container">
      {/* Loop through top-level comments */}
      {commentsArray?.map((comment,idx) => {
        return <Comment key={comment._id} comment={comment} author={namesArray[idx]} />
})}
    </div>
  );
};

export default CommentsList;
