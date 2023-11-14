'use client';

import {useEffect, useState} from 'react';
import ChannelList from './ChannelList'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import { BiCommentDetail } from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsChevronDown} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa';
import { getCarousel, getInfiniteScroll } from '@/utils/helper';
// LoggedINPage Imports
import {FcGallery} from 'react-icons/fc';
import Image from 'next/image';
import {HiOutlineLink} from 'react-icons/hi';
import UserAvatar2 from '@/assets/UserAvatar2.webp'
import {BsFire} from 'react-icons/bs';
import {BsPatchCheckFill} from 'react-icons/bs';
import { getPosts } from '@/utils/helper';
import premiumLogo from '@/assets/premiumLogo.png'
import redditBg from '@/assets/redditBg.png';
import Link from 'next/link';
import redditWhiteLogo from '@/assets/reddit-white-logo.png';

const PostsList = ({posts,channels}) => {

    const [genreModal,setGenreModal] = useState(false);
    const [viewMode,setViewMode] = useState(false);
    const [page,setPage] = useState(1);
    const [postList,setPostList] = useState(posts);

    function handleViewMode(){
        setViewMode(prev=>!prev);
    }

    // console.log('hello');

        // async function getInfinitePost(){
        //     setPage(prev=>prev+1);
        //     const data = await getInfiniteScroll(page);
        //     console.log(data);
        //     console.log('hi im called')
        //     setPostList(prev=>[...prev,data]);
        // }

        // const onScroll = ()=>{
        //     if (
        //         window.innerHeight + window.scrollY >= document.body.offsetHeight
        //     ){getInfinitePost()}
        //     else{
        //         console.log('not yet')
        //     }
        // }

        // useEffect(()=>{
        //     window.addEventListener('scroll',onScroll);
        //     return ()=> window.removeEventListener('scroll',onScroll);
        // },[page])

  return (
    <div className='laptop:flex text-sm gap-8'>
      <div className='laptop:w-[70%] px-8 z-20'>
        <div className="laptop:flex justify-between items-center relative bg-white py-2 px-4 rounded-lg">
          <div>
            <div className="cursor-pointer border-[1px] py-2 font-semibold border-gray-400 px-4 rounded-full hover:bg-black hover:text-white">Create Post</div>
          </div>
            <div className='cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 '>
              <div onClick={()=>setGenreModal(prev=>!prev)} className='flex items-center relative px-4 py-[0.34rem] rounded-full gap-2 hover:bg-gray-300'>Hot <BsChevronDown/></div>
              {genreModal && <div className='absolute right-[6.6rem] flex flex-col top-8 w-fit h-fit py-2 px-2 rounded-lg bg-white shadow-lg border-[1px] border-gray-200'>
                <span className='hover:bg-gray-100 px-6 py-2'>Hot</span>
                <span className='hover:bg-gray-100 px-6 py-2'>Top</span>
                <span className='hover:bg-gray-100 px-6 py-2'>Popular</span>
                <span className='hover:bg-gray-100 px-6 py-2'>Best</span>
              </div>}
            <div onClick={handleViewMode} className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
              <GiHamburgerMenu/>
              <BsChevronDown/>  
            </div>
           {viewMode && <div className='absolute right-[-1.8rem] top-8 w-fit h-fit py-2 px-2 rounded-lg bg-white shadow-lg border-[1px] border-gray-200'>
              <div className='font-extrabold'>View</div>
              <div className='flex flex-col'>
                <span className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Card</span>
                <span className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Classic</span>
              </div>
            </div>}
          </div>
        </div>
        <div className="py-6">
        {postList?.map(post=>{
            return <div key={post._id} className="mb-2 bg-white rounded-lg border-b-2 border-gray">
              <div className="cursor-pointer grid gap-2 mb-4 py-4 px-8 rounded-2xl hover:bg-gray-100">
                <div className="flex justify-between gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <img className='rounded-full w-6' src={post?.author?.profileImage} alt='user logo'/>
                    <div className="text-xs">u/{post?.author?.name}</div>
                  </div>
                  <div className="bg-blue-700 px-4 py-1 w-fit text-xs text-white rounded-full hover:bg-blue-800">Join</div>
                </div>
                <div className="text-[13px] font-normal">
                  {post.content}
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center bg-gray-100 rounded-full text-xs font-semibold hover:bg-gray-200 py-2 px-2 gap-2">
                    <BiUpvote className="text-xl cursor-pointer hover:text-red-600"/> {post?.likeCount} <BiDownvote className="text-xl cursor-pointer hover:text-blue-400"/>
                  </div>
                  <div className='flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2 gap-2'><BiCommentDetail className="text-xl cursor-pointer"/></div>
                  <div className="flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2 gap-2"><FaShareSquare className="text-xl"/> Share</div>
                </div>
              </div>
            </div>
        })}
        </div>
      </div>
      {/* Right Channel Sidebar */}
      <ChannelList channels={channels} />
    </div>
  )
}

const LoggedInPosts = () =>{

  const [post,setPost] = useState([]);
  const [carousel,setCarousel] = useState([]);

  async function getPostsFunc(){
    const data = await getPosts();
    const carousel = await getCarousel();
    setCarousel(carousel);
    setPost(data);
  }

  useEffect(()=>{
    getPostsFunc();
  },[])

    return (
        <div className='flex flex-col gap-8'>
          <div className='flex w-full h-52 gap-8 overflow-auto no-scrollbar'>
            {carousel?.map((ecar=>{
              return <Link key={ecar._id} href={''}>
                <div className='w-[18rem] h-full relative'>
                  <img className='w-full h-full rounded-lg  bg-gradient-to-t from-transparent to-black' src={ecar?.author?.profileImage} alt="" /> 
                  <div className='absolute bottom-5 text-white px-4'>
                    <div>r/{ecar.channel.name}</div>
                    <div>{ecar.content.slice(0,32)}...</div>
                </div>
              </div>
            </Link>
            }))}
          </div>
          <div className='w-full gap-8 flex'>
            <div className='laptop:w-[60%] flex flex-col gap-6'>
              <div className='flex w-full justify-start bg-white rounded-lg items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray'>
                  <Image src={UserAvatar2} alt="userLogo" width={40} height={10} />
                  <input className='cursor-pointer border-2 border-gray w-[78%] px-3 h-10 placeholder:text-black-200' placeholder='Create Post'/>
                  <FcGallery className='cursor-pointer text-2xl'/>
                  <HiOutlineLink className='cursor-pointer text-2xl'/>
              </div>
              <div className='flex w-full bg-white rounded-lg justify-between items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray'>
                <div className='flex gap-4'>
                  <div className='flex items-center cursor-pointer gap-1 active:text-blue-400'><BsFire/> Hot</div>  
                  <div className='flex items-center cursor-pointer gap-1 active:text-blue-400'><BsPatchCheckFill/>Latest</div>
                </div>
                  <div className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
                    <GiHamburgerMenu/>
                    <BsChevronDown/>  
                </div>
              </div>
              <div className='flex w-full items-center '>
              <div className='flex flex-col gap-8'>
                {post?.map(epost=>{
                  return <div className='flex w-fit shadow-lg bg-white rounded-lg'>
                      <div className='bg-gray-100 w-12 py-2 pb-6 px-2 flex flex-col items-center rounded-lg'>
                        <BiUpvote className='text-xl'/>
                        {epost?.likeCount}
                        <BiDownvote className='text-xl'/>
                      </div>
                      <div className='py-4 gap-3 flex flex-col px-2'>
                        <div className='flex text-[12px] gap-2 items-center'>
                          <img className='w-9 h-9 rounded-full' src={epost?.channel?.image} />
                          <div>r/{epost?.channel?.name}</div>
                          <div className='text-gray-600'>Posted By r/{epost?.author?.name}</div>
                        </div>
                        <div className='text-sm'>{epost?.content}</div>
                        <div className='text-sm flex gap-4'>
                          <div className='flex gap-1'><BiCommentDetail className='text-xl'/> {epost.commentCount} Comments</div>
                          <div className='flex gap-1'><FaShareSquare className='text-xl'/> Share</div>
                          </div>
                      </div>
                  </div> 
                })}
              </div>
              </div>
            </div>
            <div className='laptop:w-[30%] flex justify-start flex-col gap-4'>
              <div className='w-full justify-start shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center bg-white rounded-lg gap-4'>
                <div className='flex justify-start items-center'>
                  <Image src={premiumLogo} alt='Premium Logo'/>
                  <div>
                    <div className='text-[12px]'>Reddit Premium</div>
                    <div className='text-[12px]'>The best Reddit Experience</div>
                  </div>
                </div>
                <div className='bg-red-500 text-center text-white w-full rounded-full py-1 px-2'>
                  Try Now
                </div>
                </div>
                <div className='w-full relative shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center gap-4 bg-white rounded-lg'>
                    <Image src={redditBg} alt='redditBg' width='' height=''/>
                    <div className='flex justify-start text-start items-center pb-4'>
                      <Image className='absolute top-[2.4rem] left-2 w-12 h-18' src={redditWhiteLogo} alt='redditWhiteLogo' width='' height=''/>
                      <div className='font-bold'>Welcome,</div>
                    </div>
                    <div className='border-b-[1px] border-gray text-sm'>
                      Your personal Reddit frontpage. 
                      Come here to check in with your favorite communities.
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                      <div className='cursor-pointer bg-blue-700 text-white text-center px-4 py-2 rounded-full w-full hover:bg-transparent hover:text-blue-700 border-[1px] hover:border-blue-700 '>Create Post</div>
                      <div className='cursor-pointer border-[1px] border-blue-700 text-center text-blue-700 px-4 py-2 rounded-full w-full hover:bg-blue-100'>Create Community</div>
                    </div>
                </div> 
                <div className='w-full sticky top-16 shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center gap-4 bg-white rounded-lg'>
                  <div className='flex w-full  text-[0.8rem] border-b-[1px] border-gray'>
                    <div className='w-[40%] text-start'>
                      <div>User Agreement</div>
                      <div>Privacy Policy</div>
                    </div>
                    <div className='w-[60%] text-start'>
                      <div>Content Policy</div>
                      <div>Moderator Code of Conduct</div>
                    </div>
                  </div>
                  <div className='flex text-[0.8rem] w-full  border-b-[1px] border-gray'>
                    <div className='w-[40%] text-start'>
                      <div>English</div>
                      <div>English</div>
                      <div>English</div>
                    </div>
                    <div className='w-[60%] text-start'>
                      <div>English</div>
                      <div>English</div>
                      <div>English</div>
                    </div>
                  </div>
                  <div className='text-sm'>
                    Reddit, Inc. © 2023. All rights reserved.
                  </div>
                  </div> 
            </div>
          </div>
      </div>
    )
}

export default LoggedInPosts;

