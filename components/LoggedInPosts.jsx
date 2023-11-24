'use client';

import {useState,useEffect} from 'react';
import {FcGallery} from 'react-icons/fc';
import Image from 'next/image';
import {HiOutlineLink} from 'react-icons/hi';
import UserAvatar from '@/assets/userAvatar.webp'
import {BsFire} from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import {BsPatchCheckFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';
import premiumLogo from '@/assets/premiumLogo.png'
import redditBg from '@/assets/redditBg.png';
import Link from 'next/link';
import redditWhiteLogo from '@/assets/reddit-white-logo.png';
import { getPosts,getCarousel, getSelector } from '@/utils/helper';
import { ChannelDetails } from './ChannelPage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { ViewOptionsModal } from './CustomModals';
import {LoggedInPostsList} from './PostsList';
import { setViewOptionsDropdown } from '@/slices/homeSlice';

const LoggedInPosts = ({id=''}) =>{

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(true);
    const [post,setPost] = useState([]);
    const [carousel,setCarousel] = useState([]);
    const userLoggedIn = getSelector('userLoggedIn');
    const darkMode = getSelector('darkMode');
    const viewOptionsDropdown = getSelector('viewOptionsDropdown');
    const viewOptionsWidth = getSelector('viewOptionsWidth');


    function handleViewMode(){
      dispatch(setViewOptionsDropdown(!viewOptionsDropdown));
  }

    async function getPostsFunc(){
      const data = await Promise.all([getPosts(),getCarousel()]);
      setCarousel(data[0]);
      setPost(data[1]);
      setLoader(false);
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(()=>{
      getPostsFunc();
    },[])

    if(loader) return <Loader/>;
    
  
      return (
          <div className={`flex flex-col relative  ${viewOptionsWidth=='Card' ?'gap-8 px-8' :'px-4 gap-4'} py-8`}>
            {userLoggedIn && window.location.pathname.includes('popular') ? <div className='flex w-full h-52 gap-8 overflow-auto no-scrollbar'>
              {carousel?.map(((ecar,idx)=>{
                return <Link key={ecar._id} href={`r/${ecar?._id}/comments/${ecar?._id}`}>
                  <div className='w-[18rem] h-full relative'>
                    <img className='w-full h-full rounded-lg  bg-gradient-to-t from-transparent to-black' src={`https://loremflickr.com/320/240?random=${idx+1}`} alt="" /> 
                    <div className={`absolute bottom-5 px-4`}>
                      <div className='text-white'>r/{ecar.channel.name}</div>
                      <div className='text-white'>{ecar.content.slice(0,32)}...</div>
                  </div>
                </div>
              </Link>
              }))}
            </div>:''}
            <div className={`w-full gap-8 flex ${darkMode ? 'bg-black text-white': 'bg-white text-black'}`}>
              <div className='laptop:w-[60%] flex flex-col gap-6'>
                <div className={`flex w-full justify-start  rounded-lg items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray`}>
                    <Image src={UserAvatar} alt="userLogo" width={40} height={10} />
                    <Link className='w-full' href='/createpost'><input className='cursor-pointer border-2 border-gray w-full px-3 h-10 placeholder:text-black-200' placeholder='Create Post'/></Link>
                    <FcGallery className='cursor-pointer text-3xl'/>
                    <HiOutlineLink className='cursor-pointer text-2xl'/>
                </div>
                <div className='flex w-full  rounded-lg justify-between items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray'>
                  <div className='flex gap-4'>
                    <div className='flex items-center cursor-pointer gap-1 active:text-pink-400'><BsFire/> Hot</div>  
                    <div className='flex items-center cursor-pointer gap-1 active:text-pink-500'><BsPatchCheckFill/>Latest</div>
                  </div>
                  <div className='cursor-pointer relative flex items-center px-4 py-2 rounded-full'>
                    <div onClick={handleViewMode} className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
                      <GiHamburgerMenu/>
                      <BsChevronDown/>  
                    </div>
                  {viewOptionsDropdown && <ViewOptionsModal/>}
                </div>
                </div>
                <div className='flex w-full items-center '>
                  <LoggedInPostsList post={post} />
                </div>
              </div>
              <div className='laptop:w-[30%] flex justify-start flex-col gap-4'>
                {window.location.pathname.includes('r/') ? <ChannelDetails/>:<PostsSidebar/>}
                <div className='flex justify-center sticky top-[88%] pt-8'> 
                  <button onClick={scrollToTop} className={` w-fit rounded-full flex bg-blue-400 text-white  px-4 py-2`}>Move To Top</button>
                </div>
              </div>
            </div>
        </div>
      )
  }

  const PostsSidebar =()=>{
    const darkMode = useSelector(store=>store.homeSlice.darkMode);

    return (
      <>
      <div className={`w-full justify-start shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg gap-4`}>
                  <div className='flex justify-start w-full gap-4 items-center'>
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
                  <div className={`w-full relative shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center gap-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}  rounded-lg`}>
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
                        <div className='cursor-pointer bg-blue-700 text-white text-center px-4 py-2 rounded-full w-full hover:bg-transparent hover:text-blue-700 border-[1px] hover:border-blue-700'>Create Post</div>
                        <div className={`cursor-pointer border-[1px] border-blue-900 text-center ${darkMode ? 'text-white' : 'text-gray-800'} px-4 py-2 rounded-full w-full hover:bg-blue-100 hover:text-black`}>Create Community</div>
                      </div>
                  </div> 
                  <div className={`w-full sticky top-16 shadow-md border-[1px] px-2 py-4 border-gray text-sm flex flex-col items-center gap-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg`}>
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