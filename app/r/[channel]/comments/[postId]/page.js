'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import { useDispatch } from "react-redux";
import CommentsPage from '@/components/CommentsPage';
import { getSelector } from '@/utils/helper';
import { loginUser, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setShowLoginModal, setViewOptionsDropdown, setWidth } from '@/slices/homeSlice';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ChatModal } from '@/components/CustomModals';
import Navbar from '@/components/Navbar';

const Page = ({params}) => {  
  
  const dispatch = useDispatch();
  const showSidebar = getSelector('sidebar');
  const darkMode = getSelector('darkMode');
  const userLoggedIn = getSelector('userLoggedIn');
  const showMessageModal = getSelector('messageModal');
  
  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));  
    redirect('/');
  };

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

function resize(){
  dispatch(setWidth(window.innerWidth));
}

useEffect(()=>{
  resize();
  window.addEventListener('resize',resize);
  return ()=> window.removeEventListener('resize',resize);
},[])

  useEffect(()=>{
    window.addEventListener('scroll',closeDropdowns);
    handleAutoLoginUser();
    return ()=> window.removeEventListener('scroll',closeDropdowns);
  },[])

  return (
    <>
    <Navbar/>
    <div className={`laptop:flex relative h-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] left-[18rem]' : 'w-full left-3'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative top-[5rem] h-[100%]`}>
        <CommentsPage id={params.postId}/>
      </div>
    </div>
    {showMessageModal && <ChatModal/>}
    <Toaster/>
    </>
  )
}

export default Page;