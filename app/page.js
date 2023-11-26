'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { loginUser, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setViewOptionsDropdown, setWidth } from '@/slices/homeSlice';
import { useEffect } from 'react';
import { getSelector } from '@/utils/helper';
import { ChatModal } from '@/components/CustomModals';



const Page = () => {  

  const dispatch = useDispatch();
  const showSidebar = getSelector('sidebar');
  const darkMode = getSelector('darkMode');
  const showMessageModal = getSelector('messageModal');

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
    <div  className={`laptop:flex relative h-fit`}>
      {showSidebar && <div className='laptop:w-[17%] tablet:min-w-[17%] fixed z-30 laptop:top-12 tablet:top-12 tablet:py-7 mobile:top-9 mobile:py-6'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
        <Main/>
      </div>
      {showMessageModal && <ChatModal/>}
      <Toaster/>
    </div>
    </>
  )
}

export default Page;