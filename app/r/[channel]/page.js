'use client';

import Main from '@/components/Main';
import { useDispatch } from "react-redux";
import ChannelPage from '@/components/ChannelPage';
import { getSelector } from '@/utils/helper';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import SidebarMenu from '@/components/SidebarMenu.jsx';
import { loginUser, setNavbarDropdown, setNotificationModal, setShowLoginModal, setViewOptionsDropdown, setWidth, showSidebar } from '@/slices/homeSlice';
import { ChatModal } from '@/components/CustomModals';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { IoCloseOutline } from "react-icons/io5";


const Page = ({params}) => { 

  const dispatch= useDispatch();
  const width = getSelector('width');
  const showSidebarSlice = getSelector('sidebar');
  const userLoggedIn = getSelector('userLoggedIn');
  const darkMode = getSelector('darkMode');
  const showMessageModal = getSelector('messageModal');

  console.log(params);


  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));  
    redirect('/');
  };
  
  
  const closeDropdowns = () =>{
    dispatch(setViewOptionsDropdown(false));
    dispatch(setNavbarDropdown(false));
    dispatch(setNotificationModal(false));
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

  function resize(){
    dispatch(setWidth(window.innerWidth));
  }

  useEffect(()=>{
    resize();
    window.addEventListener('resize',resize);
    return ()=> window.removeEventListener('resize',resize);
  },[])

  return (
    <>
    <Navbar/>
    <div className={`laptop:flex relative h-fit`}>
      {showSidebarSlice && <div className={`${showSidebarSlice && width<=760 ? 'w-full flex justify-between sidebarOpacity':'laptop:w-[17%] tablet:min-w-[17%]'} fixed z-30 laptop:top-7 tablet:top-12 mobile:top-9`}>
        <SidebarMenu/>  
        <div className='absolute tablet:top-10 mobile:top-8 right-8 text-3xl text-white' onClick={()=>dispatch(showSidebar(false))}><IoCloseOutline/></div>
      </div>}
      <div className={`${showSidebarSlice && width>=760 ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
        {params.channel ? <ChannelPage id={params.channel} /> : <Main />}
      </div>
      {showMessageModal && <ChatModal/>}
      <Toaster/>
    </div>
    </>
  )
}

export default Page;