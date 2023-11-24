import React, { useEffect } from 'react'
import Link from 'next/link';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import {AiOutlineMessage} from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { projectID } from '@/utils/constants';
import { getPosts, getSelector, notify } from '@/utils/helper';
import { UserInfoModal } from './CustomModals';
import InfiniteLoader from './InfiniteLoader';

export const LoggedInPostsList = ({post}) => {
    const darkMode = getSelector('darkMode');


    async function upvotePost(id=''){
        console.log(id);
          const res = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              "Authorization" : `Bearer ${localStorage.getItem('reddit-token')}`,
              projectID,
            }
          })
          const data = await res.json();
          
        }
    
       async function downvotePost(id){
          const res = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`,{
            method:'DELETE',
            headers:{
              Authorization : `Bearer ${localStorage.getItem('reddit-token')}`,
              projectID
            }
          })
          const data= await res.json();
          console.log(data);
        }

        function handlePostShare(id){
          navigator.clipboard.writeText(window.location.href+'r/'+id+'/comments/'+id);
          notify('Path copied to clipboard');
        }

  return (
    <div className='flex flex-col gap-8'>   
                  {post?.map(epost=>{
                    return <div className='flex w-fit shadow-lg rounded-lg'>
                        <div className={`${darkMode ? 'bg-gray-700':'bg-gray-100'} w-12 py-2 pb-6 px-2 flex flex-col items-center rounded-lg`}>
                          <BiUpvote className='text-xl cursor-pointer hover:text-red-500' onClick={()=>upvotePost(epost._id)}/>
                          {epost?.likeCount}
                          <BiDownvote className='text-xl cursor-pointer hover:text-blue-500' onClick={()=>downvotePost(epost._id)} />
                        </div>
                        <div className='py-4 gap-3 flex flex-col px-2'>
                          <div className='flex text-[12px] gap-2 items-center'>
                            <img className='w-9 h-9 rounded-full' src={epost?.channel?.image} />
                            <Link href={`r/${epost?.channel?._id}`}><div className='hover:underline'>r/{epost?.channel?.name}</div></Link>
                            <Link href={`u/${epost?.author?._id}`}><div className='text-gray-600'>Posted By <span className='hover:underline'>u/{epost?.author?.name}</span></div></Link>
                          </div>
                        <Link key={epost._id} href={`r/${epost?._id}/comments/${epost?._id}`}>
                          <div className='text-sm'>{epost?.content}</div>
                          </Link>
                          <div className='text-sm flex gap-4'>
                        <Link key={epost._id} href={`r/${epost?._id}/comments/${epost?._id}`}>
                          <div className='flex gap-1 hover:bg-gray-100 px-3 py-1 rounded-full cursor-pointer'><AiOutlineMessage className='text-xl'/> {epost.commentCount} Comments</div>
                        </Link>
                          <div className='flex gap-1 hover:bg-gray-100 px-3 py-1 rounded-full cursor-pointer' onClick={()=>handlePostShare(epost?._id)}><IoMdShareAlt className='text-xl'/> Share</div>
                            </div>
                          </div>
                        </div> 
                  })}
                </div>
  )
}

const NormalPostsList = ({posts,infiniteLoader,page}) =>{

  const viewOptionsWidth = getSelector('viewOptionsWidth');
  
  function handlePostShare(id){
    navigator.clipboard.writeText(window.location.href+'r/'+id+'/comments/'+id);
    notify('Path copied to clipboard');
  }

  return <div className="py-6">
          {posts?.map((post,idx)=>{
            return <div key={post?._id} className="bg-white rounded-lg border-b-2 border-gray">
              <div className={`cursor-pointer ${viewOptionsWidth=='Card'?'my-4':''} grid gap-2 py-4 px-8 rounded-2xl hover:bg-gray-100`}>
                <div className="flex justify-between gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <img className='rounded-full w-6' src={post?.author?.profileImage} alt='user logo'/>
                    <div className="text-xs relative">
                      <div className='hover:underline'> u/{post?.author?.name} </div>
                      {idx==90 && <div className='absolute shadow-xl top-4 bg-white z-10 text-black px-4 gap-4 py-4 flex flex-col rounded-lg text-md w-[13.5rem] h-[25rem]'><UserInfoModal/></div>}
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
            })}
        {infiniteLoader && <div className='flex justify-center py-2 items-center'><InfiniteLoader/></div>}
        {page>=9 && !infiniteLoader && <div className='w-full text-center  text-sm text-gray-600'>You all caught up!</div>}
        </div>
 
}

export default NormalPostsList;