'use client';

import Main from '@/components/Main';
import { useDispatch } from "react-redux";
import ChannelPage from '@/components/ChannelPage';
import { getSelector } from '@/utils/helper';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import SidebarMenu from '@/components/SidebarMenu.jsx';
import { loginUser, setNavbarDropdown, setNotificationModal, setShowLoginModal, setViewOptionsDropdown, setWidth } from '@/slices/homeSlice';
import { ChatModal } from '@/components/CustomModals';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

const Page = ({params}) => { 

  const dispatch= useDispatch();
  const showSidebar = getSelector('sidebar');
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
    <div  className={`laptop:flex relative h-fit`}>
      {showSidebar && <div className='w-[17%] fixed z-30 top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] left-[16.1rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%]`}>
        {params.channel ? <ChannelPage id={params.channel} /> : <Main />}
      </div>
      {showMessageModal && <ChatModal/>}
    </div>
    <Toaster/>
    </>
  )
}

export default Page;