'use client';

import Image from 'next/image';
import WhiteLogo from '@/assets/reddit-logo-full.webp';
import BlackLogo from '@/assets/dark-reddit-logo.png';
import UserLogo from '../assets/userLogo.webp';
import {GoSearch} from 'react-icons/go';
import {BsQrCodeScan} from 'react-icons/bs';
import {PiDotsThreeBold} from 'react-icons/pi';
import {AiFillHome} from 'react-icons/ai';
import {BsChevronDown} from 'react-icons/bs';
import {BsArrowRightCircle} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {AiOutlineMessage} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {CiBullhorn} from 'react-icons/ci';
import {GiFrostfire} from 'react-icons/gi';
import { useSelector,useDispatch } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';
import homeSlice, { setData, setMessageModal, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setShowLoginModal , setWidth, showSidebar } from '@/slices/homeSlice';
import { LoggedInOptionsModal, NormalOptionsDropDown, SearchModal } from './CustomModals';
import { RxHamburgerMenu } from "react-icons/rx";
import { getSelector, notify } from '@/utils/helper';
import {NotificationModal} from '@/components/CustomModals';
import { redirect } from 'next/dist/server/api-utils';

const Navbar = () => {
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  return userLoggedIn ? <LoggedInNavbar/> : <RegularNavbar/>
}

const LoggedInNavbar = () =>{

  const dispatch= useDispatch();
  const userDetails= useSelector(store=>store.homeSlice.userDetails);
  const darkMode = useSelector(store=>store.homeSlice.darkMode);
  const showNavDropdown = getSelector('navbarDropdown'); 
  const showNotifications = getSelector('notificationModal');
  const showMessages = getSelector('messageModal');
  const width = getSelector('width');
  const openSearchModal = getSelector('openSearchModal');
  const isOnline = getSelector('isOnline');
  const postsArray = useSelector(store=>store.homeSlice.postsArray);
  
  function handleShowSidebar(){
    dispatch(showSidebar());
  }
  
  function showNavDropdownFunc(){
    dispatch(setNavbarDropdown(!showNavDropdown));
  }

  function handleNotificationModal(){
    dispatch(setNotificationModal(!showNotifications));
  }

  function handleMessageModal(){
    dispatch(setMessageModal(!showMessages));
  }

  function resize(){
    dispatch(setWidth(window.innerWidth));
  }

  function handleOpenChatModal(){
    dispatch(setOpenSearchModal(!openSearchModal));
  }

  function handleRenderPost(e){
    e.preventDefault();
    notify('Here are results matching with your keyword');
    dispatch(setOpenSearchModal(false));
    const startNum = Math.floor(Math.random()*10)+1;
    const endNum = Math.floor(Math.random()*10)+2;
    console.log(startNum)
    console.log(endNum)
    const newPosts = postsArray.slice(startNum,endNum);
    dispatch(setData({posts:newPosts}));
    console.log(newPosts);
  }

  useEffect(()=>{
    window.addEventListener('resize',resize);
    return ()=> window.removeEventListener('resize',resize);
  },[])


 return (
  <div className={`flex items-center text-sm justify-between w-full gap-4 tablet:px-8 mobile:px-3 py-[2px] fixed border-b-2 border-gray top-0 ${darkMode ? 'bg-black text-white':'bg-white text-black'} z-[100]`}>
    <div className='flex min-w-[25%] items-center gap-4'>
    <RxHamburgerMenu onClick={handleShowSidebar} className='text-3xl cursor-pointer'/>
        <Link href='/'><Image className='cursor-pointer' priority={false} src={WhiteLogo} width={110} height={10} alt='reddit-logo'/></Link>
        {width>=1024 &&<div onClick={handleShowSidebar} className={`cursor-pointer flex items-center gap-4 justify-between w-fit px-4 py-2 ${darkMode ? 'bg-black text-white':'bg-white text-black hover:bg-gray-50'}`}>
          <div className='flex items-center gap-2'>
          <AiFillHome className='text-xl'/>
            Home
          </div>
          <div className='flex items-center'>
          <BsChevronDown/>
          </div>
        </div>}
    </div>
    <div className='flex relative items-center cursor-pointer w-[80rem] min-w-[50%] justify-start gap-4'>
      <form onSubmit={handleRenderPost} onClick={handleOpenChatModal} className={`flex relative items-center w-[70%] py-2 px-4 bg-gray-200 ${openSearchModal?'rounded-t-3xl':'rounded-full'} gap-4 hover:bg-gray-100 border-[1px] hover:border-blue-400`}>
        <GoSearch className='text-2xl'/>
        <input className='w-[100%] bg-transparent outline-none' placeholder='Search Reddit'/>
        {openSearchModal && <SearchModal/>}
      </form>
        {width>=1024 && <Link href='/popular'><BsArrowRightCircle className='text-2xl cursor-pointer hover:text-blue-400'/></Link>}
        <AiOutlineMessage onClick={handleMessageModal} className='text-3xl cursor-pointer hover:text-blue-400'/>
        <IoMdNotificationsOutline onClick={handleNotificationModal} className='text-4xl cursor-pointer hover:text-blue-400'/>
        {width>=1024 && <Link href='/createpost'><AiOutlinePlus className='text-2xl cursor-pointer hover:text-blue-400'/></Link>}
        {width>=1024 && <div onClick={()=>notify('Feature coming soon...')} className={`flex cursor-pointer  ${darkMode ? 'bg-black border-[1px] border-blue-400 hover:text-blue-400':'bg-gray-100 text-black'} items-center py-2 px-4 gap-2 rounded-full`}>
          <CiBullhorn className='text-2xl'/>
          Advertise
         </div>}
        {showNotifications && <NotificationModal/>}
    </div>
    <div onClick={showNavDropdownFunc} className={`flex min-w-[13%] justify-between items-center ps-2 cursor-pointer  ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
      <div className='flex items-center gap-2'>
        <div className='relative py-1 px-1 bg-gray-300 rounded-full'>
          <Image src={UserLogo} priority={false} width={45} height={15} alt='user Logo'/>
          {isOnline && <p className='bg-green-400 absolute bottom-1 right-[0.39rem] w-2 h-2 rounded-full'></p>}
        </div>
        {width>=1024 && <div className=''>
          <div>{userDetails ? userDetails : 'User'}</div>
          <div className='flex gap-1 items-center'><GiFrostfire className='text-orange-600'/> 13 Karma</div>
        </div>}
      </div>
        {width>=1024 && <div className='flex items-center'>
          <BsChevronDown/>
        </div>}
    </div>
        {showNavDropdown && <LoggedInOptionsModal/>}
  </div>
 )

}

const RegularNavbar = () =>{
  const dispatch = useDispatch();
  const darkMode = useSelector(store=>store.homeSlice.darkMode);
  const showNavDropdown = getSelector('navbarDropdown'); 
  const width = getSelector('width');


  function showNavDropdownFunc(){
    // console.log(showNavDropdown);
    dispatch(setNavbarDropdown(!showNavDropdown));
  }

  function handleLogin(){
    dispatch(setShowLoginModal(true));
  }

  function handleShowSidebar(){
    dispatch(showSidebar());
  }
  

  return (
    <div className={`flex items-center text-sm justify-between w-full desktop:gap-4 desktop:px-8 laptop:px-4 tablet:px-4 py-3 fixed border-b-2 border-gray top-0 ${darkMode ? 'bg-black text-white':'bg-white text-black'} z-[100]`}>
      <div className='min-w-[10rem] flex gap-2 tablet:gap-4 items-center'>
        <RxHamburgerMenu onClick={handleShowSidebar} className='text-lg cursor-pointer min-w-lg'/>
        <Link href='/'><Image className='cursor-pointer' priority={false} src={WhiteLogo} width={110} height={10} alt='reddit-logo'/></Link>
      </div>
      <div className='flex items-center cursor-pointer border-black desktop:w-[60rem] laptop:min-w-[50rem] laptop:max-w-[45rem] tablet:max-w-[30rem] tablet:min-w-[20rem] py-2 px-4 rounded-full gap-4 bg-gray-100 border-[1px] hover:border-blue-400 '>
        <GoSearch className='text-2xl'/>
        <input className='w-full bg-transparent outline-none' placeholder='Search Reddit'/>
      </div>
      {width >=1024 ? <div className='flex min-w-[16rem] mobile:text-sm laptop:text-md tablet:w-[15rem] justify-between'>
        <div onClick={()=>notify('Feature coming soon...')} className='flex items-center px-4 laptop:px-2 py-2 gap-2 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300'>
            <BsQrCodeScan/>
            Get App
          </div>
        <div onClick={handleLogin} className='py-2 px-4 bg-red-500 text-white rounded-3xl cursor-pointer hover:bg-red-700'>
            Log In
          </div>
          <div onClick={showNavDropdownFunc} className='flex relative items-center cursor-pointer text-lg px-2 py-2 hover:bg-gray-200 rounded-[100%]'>
            <PiDotsThreeBold />
            {showNavDropdown && <NormalOptionsDropDown/>}
          </div>
      </div> : <div onClick={showNavDropdownFunc} className='flex relative items-center cursor-pointer text-lg px-2 py-2 hover:bg-gray-200 rounded-[100%]'>
      <PiDotsThreeBold />
      {showNavDropdown && <NormalOptionsDropDown/>}
    </div>}

    </div>
  )
}

export default Navbar;
