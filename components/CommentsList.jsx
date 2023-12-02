import { pushAuthorDetails } from '@/slices/homeSlice';
import { memo } from 'react';
import { getSelector } from '@/utils/helper';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Comment = ({comment,author}) => {

const timestampStr = comment?.createdAt || new Date();
const timestampDate = new Date(timestampStr);
const hour = timestampDate.getUTCHours();
const minute = timestampDate.getUTCMinutes();
const day = timestampDate.getUTCDate();
const year = timestampDate.getUTCFullYear();

const readableDateTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}, ${day.toString().padStart(2, '0')}/${year}`;

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

const CommentsList = memo(function CommentsList() {
  const commentsArray = useSelector(store=>store.homeSlice.commentPageData.comments);
  const namesArray = getSelector('namesArray');
  

  return (
    <div className="comment-container">
      {/* Loop through top-level comments */}
      {commentsArray?.map((comment,idx) => {
        console.log(comment);
        return <Comment key={comment._id} comment={comment} author={namesArray[idx]} />
})}
    </div>
  );
});

export default CommentsList;
