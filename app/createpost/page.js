'use client';

import { useEffect } from 'react';
import SidebarMenu from '@/components/SidebarMenu.jsx';
import CreatePost from '@/components/CreatePost';
import { getSelector } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { loginUser, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setShowLoginModal, setViewOptionsDropdown, setWidth, showSidebar } from '@/slices/homeSlice';
import { ChatModal } from '@/components/CustomModals';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { IoCloseOutline } from "react-icons/io5";


const Page = () => { 

  const dispatch= useDispatch();
  const width = getSelector('width');
  const showSidebarSlice = getSelector('sidebar');
  const userLoggedIn = getSelector('userLoggedIn');
  const darkMode = getSelector('darkMode');
  const showMessageModal = getSelector('messageModal');


  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));  
    redirect('/');
  };
  
  function resize(){
    dispatch(setWidth(window.innerWidth));
  }

  const closeDropdowns = () =>{
    dispatch(setViewOptionsDropdown(false));
    dispatch(setNavbarDropdown(false));
    dispatch(setNotificationModal(false));
    dispatch(setOpenSearchModal(false));
 }

 const handleAutoLoginUser=async()=>{
  if(localStorage.getItem('reddit-userId')){
    dispatch(loginUser());
  }
}

 useEffect(()=>{
  window.addEventListener('scroll',closeDropdowns);
  handleAutoLoginUser();
  return ()=> window.removeEventListener('scroll',closeDropdowns);
},[])

  useEffect(()=>{
    resize();
    window.addEventListener('resize',resize);
    return ()=> window.removeEventListener('resize',resize);
  },[])

  return (
    // <>
    // <Navbar/>
    //  <div  className={`laptop:flex relative h-fit`}>
    //   {showSidebar && <div className='laptop:w-[17%] tablet:min-w-[17%] fixed z-30 laptop:top-12 tablet:top-12 tablet:py-7 mobile:top-9 mobile:py-6'>
    //     <SidebarMenu/>
    //   </div>}
    //   <div className={`${showSidebar ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
    //     <CreatePost/>
    //   </div>
    //   {showMessageModal && <ChatModal/>}
    //   <Toaster/>
    // </div>
    // </>
    <>
    <Navbar/>
    <div className={`laptop:flex relative h-fit`}>
      {showSidebarSlice && <div className={`${showSidebarSlice && width<=760 ? 'w-full flex justify-between sidebarOpacity':'laptop:w-[17%] tablet:min-w-[17%]'} fixed z-30 laptop:top-7 tablet:top-12 mobile:top-9`}>
        <SidebarMenu/>  
        <div className='absolute tablet:top-7 mobile:top-8 right-8 text-3xl text-white' onClick={()=>dispatch(showSidebar(false))}><IoCloseOutline/></div>
      </div>}
      <div className={`${showSidebarSlice && width>=760 ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
        <CreatePost/>
      </div>
      {showMessageModal && <ChatModal/>}
      <Toaster/>
    </div>
    </>
  )
}

export default Page;