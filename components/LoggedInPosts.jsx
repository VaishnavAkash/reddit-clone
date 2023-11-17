'use client';

import {useState,useEffect} from 'react';
import {FcGallery} from 'react-icons/fc';
import Image from 'next/image';
import {HiOutlineLink} from 'react-icons/hi';
import {BiUpvote} from 'react-icons/bi';
import {BiDownvote} from 'react-icons/bi';
import {BiCommentDetail} from 'react-icons/bi';
import { FaShareSquare } from 'react-icons/fa';
import UserAvatar from '@/assets/userAvatar.webp'
import {BsFire} from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import {BsPatchCheckFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';
import premiumLogo from '@/assets/premiumLogo.png'
import redditBg from '@/assets/redditBg.png';
import Link from 'next/link';
import redditWhiteLogo from '@/assets/reddit-white-logo.png';
import { getPosts,getCarousel } from '@/utils/helper';
import { ChannelDetails } from './ChannelPage';
import { useSelector } from 'react-redux';

const LoggedInPosts = () =>{

    const [post,setPost] = useState([]);
    const [carousel,setCarousel] = useState([]);
    const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  
    async function getPostsFunc(){
      const data = await Promise.all([getPosts(),getCarousel()]);
      setCarousel(data[0]);
      setPost(data[1]);
    }
  
    useEffect(()=>{
      getPostsFunc();
    },[])
  
      return (
          <div className='flex flex-col gap-4 relative'>
            {userLoggedIn ? <div className='flex w-full h-52 gap-8 overflow-auto no-scrollbar'>
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
            </div>:''}
            <div className='w-full gap-8 flex'>
              <div className='laptop:w-[60%] flex flex-col gap-6'>
                <div className='flex w-full justify-start bg-white rounded-lg items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray'>
                    <Image src={UserAvatar} alt="userLogo" width={40} height={10} />
                    <Link href='/createpost'><input className='cursor-pointer border-2 border-gray w-[78%] px-3 h-10 placeholder:text-black-200' placeholder='Create Post'/></Link>
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
                    return <div key={epost._id} className='flex w-fit shadow-lg bg-white rounded-lg'>
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
              <div className='laptop:w-[30%] flex justify-start flex-col'>
                {false ? <PostsSidebar/>:<ChannelDetails/>}
                <div className='flex justify-center'> 
                  <button className='bg-blue-400 w-fit fixed bottom-4 rounded-full flex text-white px-4 py-2'>Move To Top</button>
                </div>
              </div>
            </div>
        </div>
      )
  }

  const PostsSidebar =()=>{
    return (
      <>
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
      </>
    )
  }

export default LoggedInPosts;