'use client';

import React, { useEffect, useState } from 'react'
import {BiUpvote} from 'react-icons/bi';
import {BiDownvote} from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { ChannelDetails } from './ChannelPage';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts,getComments, getSelector, getChannelInfo, getSinglePost, notify, addComment } from '@/utils/helper';
import { setCommentPageData, setCommentsMapper, setData } from '@/slices/homeSlice';
import Loader from './Loader';
import Link from 'next/link';
import CommentsList from './CommentsList';

const CommentsPage = ({id}) => {
  
  const dispatch= useDispatch();
  const [loader,setLoader] = useState(true);
  const darkMode = useSelector(store=>store.homeSlice.darkMode);
  const post = useSelector(store=>store.homeSlice.commentPageData.post); 
  const userDetails = getSelector('userDetails'); 
  const [comment,setComment] = useState('');
  const commentPageData = useSelector(store=>store.homeSlice.commentPageData.comments);


  
  async function getData(){
    const [post,comments] = await Promise.all([getSinglePost(id),getComments(id)]);
    dispatch(setCommentPageData({post,comments}));
    console.log(post);
    console.log(comments);
    const channels = await getChannelInfo(post?.channel?._id);
    dispatch(setData({channels}));
    console.log(channels);
    setLoader(false);
  }

  useEffect(()=>{
    getData();
  },[])

  const scrollToBottom = () => {
    const fullHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    const key = setTimeout(()=>{
      window.scrollTo({
        top: fullHeight,
        behavior: 'smooth',
      });
    },500);

   return ()=>clearTimeout(key);
  };

  function handleAddComment(id,value){
    dispatch(setCommentPageData({comments:[...commentPageData,{content:value,author:userDetails}]}));
    console.log(commentPageData)
    setComment('');
    scrollToBottom();
    notify('Comment Added Successfully');
  }


  return loader ? <Loader/> : (
    <div className={`flex gap-4 relative ${darkMode ?'bg-black text-white':'bg-white text-black'}`}>
      {/*post description  */}
        <div className='laptop:w-[60%] flex flex-col  gap-3'>
          {/* post desc */}
          <div className='flex'>
          <div className='bg-gray-400 rounded-l-lg w-fit px-3 py-4'></div>
          <div className='flex flex-col gap-8 shadow-lg rounded-r-lg px-2 py-2'>
            <div className='flex gap-1 items-center'>
              <img className='w-12 h-12 rounded-full' src={post?.author?.profileImage} />
              <Link href={`/r/${post?._id}`}><span className='text-sm hover:underline cursor-pointer'>r/{post?.channel?.name}</span></Link>
              <span className='text-gray-400 text-sm'>Posted by <span className='text-blue-400'>u/{post?.author?.name}</span> 2 days ago</span>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-sm'>{post?.content}</div>
              <div className='text-gray-400 flex items-center'><BiCommentDetail className='text-xl'/> Comments</div>
              <div className='text-sm'>Comment Below :</div>
              <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className={`text-black border-[1px] px-3 py-2 border-black $ w-full h-44`}  placeholder='What are your thoughts'></textarea>
              <div className='flex justify-end w-full h-10 rounded-sm items-center px-2 bg-gray-600'><span onClick={()=>handleAddComment(post?._id,comment)} className='bg-blue-300 cursor-pointer h-fit w-fit px-2 py-1 rounded-full'>Comment</span></div>
            </div>
          </div>
        </div>
          {/* comments section */}
          <div className='flex flex-col gap-4'>
             <div className='w-[70%] border-b-[2px] border-gray-300'>Top Comments</div>
            <CommentsList/>
          </div>
        </div>
        {/* right sidebar */}
        <div className='laptop:w-[30%] flex justify-start flex-col gap-4'>
          <ChannelDetails  />
        </div>
    </div>
  )
}

export default CommentsPage