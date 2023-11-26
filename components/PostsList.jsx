import React, { useState,useEffect } from 'react'
import Link from 'next/link';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import {AiOutlineMessage} from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { getSelector, handlePostShare, notify } from '@/utils/helper';
import { UserInfoModal } from './CustomModals';
import InfiniteLoader from './InfiniteLoader';
import { BiSolidUpvote } from "react-icons/bi";
import UpsetLogo from '@/assets/upsetLogo.jpg';
import Image from 'next/image';

export const LoggedInPostsList = () => {
  const post = getSelector('postsData');
  
  if(window.location.href.includes('r/customCommunity')) return <div className='bg-gray-200 flex flex-col justify-center items-center h-full w-full text-2xl'>
    <Image src={UpsetLogo} height='' width='' alt='upset logo'/>
    <div className='text-black font-bold'>No Posts Found!</div>
    </div>

  return (
    <div className='flex flex-col gap-8'>   
                  {post?.map((epost)=>{
                    return <HigherOrderPostCard key={epost?._id} epost={epost} />
                  })}
                  <div className='w-full text-center  text-sm text-gray-600'>You all caught up!</div>
                </div>
  )
}

const NormalPostsList = ({posts,infiniteLoader,page,handleAuthUser}) =>{

  // const [hoveredName,setHoveredName] = useState('');
  // const [hoveredId,setHoveredId] = useState('');

  return <div className="laptop:py-6 mobile:py-1">
          {posts?.map((post,idx)=>{
            return <NormalPostCard key={idx} handleAuthUser={handleAuthUser} post={post} />
            })}
        {infiniteLoader && <div className='flex justify-center py-2 items-center'><InfiniteLoader/></div>}
        {page>=9 && !infiniteLoader && <div className='w-full text-center  text-sm text-gray-600'>You all caught up!</div>}
        </div>
 
}

export default NormalPostsList;


const NormalPostCard = ({post,handleAuthUser})=>{

  const viewOptionsWidth = getSelector('viewOptionsWidth');

  // function handleShowHoveredUserModal(name,id){
  //   setHoveredName(name);
  //   setHoveredId(id);
  // }

  // function handleHideHoveredUserModal(){
  //   setHoveredName('');
  //   setHoveredId('');
  // }

  return <div onClick={handleAuthUser} key={post?._id} className="bg-white rounded-lg border-b-2 border-gray">
  <div className={`cursor-pointer ${viewOptionsWidth=='Card'?'my-4':''} grid gap-2 py-4 px-8 rounded-2xl hover:bg-gray-100`}>
    <div className="flex justify-between gap-4 items-center">
      <div className="flex items-center gap-2">
        <img className='rounded-full w-6' src={post?.author?.profileImage} alt='user logo'/>
        <div className="text-xs relative">
          <div > u/{post?.author?.name} </div>
          {/* {true && <div className='absolute shadow-xl top-4 bg-white z-10 text-black px-4 gap-4 py-4 flex flex-col rounded-lg text-md w-[13.5rem] h-[25rem]'><UserInfoModal name={hoveredName} /></div>} */}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className="bg-blue-700 px-4 py-1 w-fit text-xs text-white rounded-full hover:bg-blue-800">Join</div>
      </div>
    </div>
    <Link key={post._id} href={`r/${post?._id}/comments/${post?._id}`}>
    <div className="text-[13px] font-normal">
      {post.content}
    </div>
    </Link>
    <div className="flex gap-2">
      <div className="flex items-center bg-gray-100 rounded-full text-xs font-semibold hover:bg-gray-200 py-2 px-2 gap-2">
        <BiUpvote className="text-xl cursor-pointer hover:text-red-600"/> {post?.likeCount} <BiDownvote className="text-xl cursor-pointer hover:text-blue-400"/>
      </div>
      <Link key={post._id} href={`r/${post?._id}/comments/${post?._id}`}>
      <div className='flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2 gap-2'><AiOutlineMessage className="text-xl cursor-pointer"/></div>
      </Link>
      <div onClick={()=>handlePostShare(post?._id)} className="flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2"><IoMdShareAlt className="text-xl"/> Share</div>
    </div>
  </div>
</div>
}

const LoginPostCard = ({epost,alreadyLiked,likes,increaseLike,decreaseLike})=>{

  const darkMode = getSelector('darkMode');

  return <div className='flex w-fit shadow-lg rounded-lg'>
  <div className={`${darkMode ? 'bg-gray-700':'bg-gray-100'} w-12 py-2 pb-6 px-2 flex flex-col items-center rounded-lg`}>
    {alreadyLiked ? <BiSolidUpvote onClick={increaseLike} className='text-xl cursor-pointer text-red-500'/>:<BiUpvote className='text-xl cursor-pointer hover:text-red-500' onClick={increaseLike}/>}
    {likes}
    <BiDownvote className='text-xl cursor-pointer active:text-blue-500 hover:text-blue-500' onClick={decreaseLike} />
  </div>
  <div className='py-4 gap-3 flex flex-col px-2'>
    <div className='flex text-[12px] gap-2 items-center'>
      <img className='w-9 h-9 rounded-full' src={epost?.channel?.image} />
      {!window.location.href.includes('r/') && <Link href={`r/${epost?.channel?._id}`}><div className='hover:underline'>r/{epost?.channel?.name}</div></Link>}
      <div className='text-gray-600'>Posted By <span>{epost?.author?.name}</span></div>
    </div>
  <Link key={epost._id} href={`r/${epost?._id}/comments/${epost?._id}`}>
    <div className='text-sm w-full'>
      <div className='flex justify-center'><img className='w-full h-[30rem] rounded-lg px-2 pb-2' src={`https://loremflickr.com/320/320?cat=${Math.floor(Math.random()*50)}`} alt='post image'/></div>
      <div>{epost?.content}</div>
      </div>
    </Link>
    <div className='text-sm flex gap-4'>
  <Link key={epost._id} href={!window.location.href.includes('r/') ? `r/${epost?._id}/comments/${epost?._id}` : `/comments/${epost?._id}`}>
    <div className='flex gap-1 hover:bg-gray-100 px-3 py-1 rounded-full cursor-pointer'><AiOutlineMessage className='text-xl'/> {epost.commentCount} Comments</div>
  </Link>
    <div className='flex gap-1 hover:bg-gray-100 px-3 py-1 rounded-full cursor-pointer' onClick={()=>handlePostShare(epost?._id)}><IoMdShareAlt className='text-xl'/> Share</div>
      </div>
    </div>
  </div> 
}

const HigherOrderPostCard = ({epost}) =>{
  const [likes,setLikes] = useState(epost?.likeCount);
  const [alreadyLiked,setAlreadyLiked] = useState(false);

  function increaseLike(){
    if(alreadyLiked){
      notify('Post Already Liked');
    }else{
      setLikes(prev=>prev+1);
      setAlreadyLiked(true);
      notify('Post Liked Successfully')
    }
  }
  function decreaseLike(){
    if(alreadyLiked){
      setLikes(prev=>prev<=0?prev:prev-1);
      notify('Post disliked Successfully')
      setAlreadyLiked(false);
    }
    else{
      notify('Post Not liked yet');
    }
  }


  return <LoginPostCard epost={epost} likes={likes} alreadyLiked={alreadyLiked} increaseLike={increaseLike} decreaseLike={decreaseLike} />

}