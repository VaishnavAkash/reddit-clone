import React, { useEffect } from 'react'
import Link from 'next/link';
import { BiCommentDetail, BiDownvote, BiUpvote } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getSelector } from '@/utils/helper';

const PostsList = ({post}) => {
    const darkMode = getSelector('darkMode');


    async function upvotePost(id=''){
        console.log(id);
          const res = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              "Authorization" : `Bearer ${localStorage.getItem('reddit-token')}`,
              'projectID' : projectID,
            }
          })
          const data = await res.json();
          console.log(data);
    
          getPostsFunc();
        }
    
       async function downvotePost(id){
          await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`,{
            headers:{
              Authorization : localStorage.getItem('reddit-token'),
              projectID
            }
          })
          getPostsFunc();
        }

  return (
    <div className='flex flex-col gap-8'>   
                  {post?.map(epost=>{
                    return <Link key={epost._id} href={`r/${epost?._id}/comments/${epost?._id}`}><div className='flex w-fit shadow-lg rounded-lg'>
                        <div className={`${darkMode ? 'bg-gray-700':'bg-gray-100'} w-12 py-2 pb-6 px-2 flex flex-col items-center rounded-lg`}>
                          <BiUpvote className='text-xl cursor-pointer hover:text-red-500' onClick={()=>upvotePost(epost._id)}/>
                          {epost?.likeCount}
                          <BiDownvote className='text-xl cursor-pointer hover:text-blue-500' onClick={()=>downvotePost(epost._id)} />
                        </div>
                        <div className='py-4 gap-3 flex flex-col px-2'>
                          <div className='flex text-[12px] gap-2 items-center'>
                            <img className='w-9 h-9 rounded-full' src={epost?.channel?.image} />
                            <Link href={`r/${epost?.channel?._id}`}><div>r/{epost?.channel?.name}</div></Link>
                            <Link href={`u/${epost?.author?._id}`}><div className='text-gray-600'>Posted By u/{epost?.author?.name}</div></Link>
                          </div>
                          <div className='text-sm'>{epost?.content}</div>
                          <div className='text-sm flex gap-4'>
                            <div className='flex gap-1'><BiCommentDetail className='text-xl'/> {epost.commentCount} Comments</div>
                            <div className='flex gap-1'><IoMdShareAlt className='text-xl'/> Share</div>
                            </div>
                          </div>
                        </div> 
                    </Link>
                  })}
                </div>
  )
}

export default PostsList;