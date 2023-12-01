'use client';

import {useState,useEffect} from 'react';
import {FcGallery} from 'react-icons/fc';
import Image from 'next/image';
import {HiOutlineLink} from 'react-icons/hi';
import UserAvatar from '../assets/userLogo.webp'
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
import { CreateCommunityModal, ViewOptionsModal } from './CustomModals';
import {LoggedInPostsList} from './PostsList';
import { setCommunityModal, setData, setPostsArray, setViewOptionsDropdown, setWidth } from '@/slices/homeSlice';

const LoggedInPosts = ({id=''}) =>{

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(true);
    const [carousel,setCarousel] = useState([]);
    const userLoggedIn = getSelector('userLoggedIn');
    const darkMode = getSelector('darkMode');
    const viewOptionsDropdown = getSelector('viewOptionsDropdown');
    const viewOptionsWidth = getSelector('viewOptionsWidth');
    const communityTheme = getSelector('communityTheme');
    const [currentActiveFilter,setCurrentActiveFilter] = useState('Hot');
    const width = getSelector('width');
    const isOnline = getSelector('isOnline');
    const post = useSelector(store=>store.homeSlice.postsData);

    function handleViewMode(){
      dispatch(setViewOptionsDropdown(!viewOptionsDropdown));
  }

    async function getPostsFunc(){
      const data = await Promise.all([getPosts(),getCarousel()]);
      setCarousel(data[1]);
      dispatch(setData({posts:data[0]}));
      dispatch(setPostsArray(data[0]));
      setLoader(false);
    }

    function changeCurrentActiveFilter(e){
      setCurrentActiveFilter(e.target.innerText);
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    function resize(){
      dispatch(setWidth(window.innerWidth));
    }
  
    useEffect(()=>{
      getPostsFunc();
    },[])

    useEffect(()=>{
      window.addEventListener('resize',resize);
      return ()=> window.removeEventListener('resize',resize);
    },[])

    if(loader) return <Loader/>;
    
  
      return (
          <div className={`flex flex-col relative  ${viewOptionsWidth=='Card' ?'gap-8 px-8' :'px-4 gap-4'} py-8`}>
            {userLoggedIn && window.location.pathname.includes('popular') ? <div className='flex w-full h-52 gap-8 overflow-auto no-scrollbar'>
              {carousel?.map(((ecar,idx)=>{
                return   <Link key={ecar._id} href={`/r/${ecar?._id}/comments/${ecar?._id}`}>
                <div className='w-[18rem] h-full relative'>
                  {/* Gradient background layer */}
                  <div className='absolute top-0 left-0 w-full h-full gradient-bg rounded-lg'></div>
                  
                  <img className='w-full h-full rounded-lg' src={`https://loremflickr.com/320/240?random=${idx+1}`} alt="" />
                  
                  {/* Text div at the bottom */}
                  <div className='absolute bottom-5 px-4 left-0 w-full text-white'>
                    <div>r/{ecar.channel.name}</div>
                    <div>{ecar.content.slice(0, 27)}...</div>
                  </div>
                </div>
              </Link>
              }))}
            </div>:''}
            <div className={`w-full gap-8 flex ${darkMode ? 'bg-black text-white': 'bg-white text-black'}`}>
              <div className='laptop:w-[60%] flex flex-col gap-6'>
                <div className={`flex w-full justify-start  rounded-lg items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray`}>
                  <div className='relative py-1 px-1 bg-gray-400 rounded-full'>
                    <Image src={UserAvatar} alt="userLogo" width={60} height={14} />
                    {isOnline && <p className='bg-green-500 absolute bottom-[0.17rem] right-2 w-2 h-2 rounded-full'></p>}
                  </div>
                    <Link className='w-full' href='/createpost'><input className='cursor-pointer border-2 border-gray w-full px-3 h-10 placeholder:text-black-200' placeholder='Create Post'/></Link>
                    <Link href='/createpost'><FcGallery className='cursor-pointer text-3xl'/></Link>
                    <Link href='/createpost'><HiOutlineLink className='cursor-pointer text-2xl'/></Link>
                </div>
                <div className='flex w-full  rounded-lg justify-between items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray'>
                  <div className='flex gap-4'>
                    <div onClick={changeCurrentActiveFilter} style={currentActiveFilter=='Hot' ? {color:communityTheme}:{}} className='flex items-center cursor-pointer gap-1'><BsFire/> Hot</div>  
                    <div onClick={changeCurrentActiveFilter} style={currentActiveFilter=='Latest' ? {color:communityTheme}:{}}  className='flex items-center cursor-pointer gap-1'><BsPatchCheckFill/>Latest</div>
                  </div>
                  <div className='cursor-pointer relative flex items-center px-4 py-2 rounded-full'>
                    <div onClick={handleViewMode} className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
                      <GiHamburgerMenu/>
                      <BsChevronDown/>  
                    </div>
                  {viewOptionsDropdown && <ViewOptionsModal/>}
                </div>
                </div>
                <div className='flex w-full items-center'>
                   <LoggedInPostsList />
                </div>
              </div>
              <div className='laptop:w-[30%] flex justify-start flex-col gap-4 sticky top-20'>
                {width>=1024 && <div className='flex relative flex-col gap-5'>{window.location.pathname.includes('r/') ? <ChannelDetails id={id} />:<PostsSidebar/>}</div>}
                <div className='flex justify-center laptop:sticky mobile:fixed laptop:top-[88%] mobile:top-[37rem] right-0 pt-8'> 
                  <button onClick={scrollToTop} className={`w-fit rounded-full mobile:min-w-[2rem] mobile:text-sm laptop:text-md flex bg-blue-400 text-white  px-4 py-2`}>Move To Top</button>
                </div>
              </div>
            </div>
        </div>
      )
  }

  const PostsSidebar =()=>{

    const dispatch = useDispatch();
    const darkMode = getSelector('darkMode');
    const communityModal = getSelector('communityModal');
    const languagesArray1 = ['English','Francais','Spanish'];
    const languagesArray2 = ['Bengali','Marathi','Pubjabi'];

    function handleCommunityModal(){
      dispatch(setCommunityModal(!communityModal));  
    }
    return (
      <>
      <div className={`w-full relative flex justify-start shadow-md border-[1px] px-2 py-4 border-gray text-sm flex-col items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg gap-4`}>
                  <div className='flex justify-start w-full gap-4 items-center'>
                    <Image src={premiumLogo} alt='Premium Logo'/>
                    <div>
                      <div className='text-[12px]'>Reddit Premium</div>
                      <div className='text-[12px]'>The best Reddit Experience</div>
                    </div>
                  </div>
                  <Link href='/error' className='w-full'><div className='bg-red-500 text-center text-white w-full rounded-full py-1 px-2'>
                    Try Now
                  </div>
                  </Link>
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
                        <Link href='/createpost'><div className='cursor-pointer bg-blue-700 text-white text-center px-4 py-2 rounded-full w-full hover:bg-transparent hover:text-blue-700 border-[1px] hover:border-blue-700'>Create Post</div></Link>
                        <div onClick={handleCommunityModal} className={`cursor-pointer border-[1px] border-blue-900 text-center ${darkMode ? 'text-white' : 'text-gray-800'} px-4 py-2 rounded-full w-full hover:bg-blue-100 hover:text-black`}>Create Community</div>
                        {communityModal && <div className='fixed top-[20%] left-[30%] z-50'><CreateCommunityModal/></div>}
                      </div>
                  </div> 
                  {/* Sticky modal container */}
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
                        {languagesArray1?.map((item,idx)=><div key={idx}>{item}</div>)}
                      </div>
                      <div className='w-[60%] text-start'>
                      {languagesArray2?.map((item,idx)=><div key={idx}>{item}</div>)}
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