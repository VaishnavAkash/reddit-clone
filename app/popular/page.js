'use client';
import { useEffect } from 'react';
import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { getSelector } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { loginUser, setNavbarDropdown, setNotificationModal, setShowLoginModal, setViewOptionsDropdown, setWidth, showSidebar } from '@/slices/homeSlice';
import { redirect } from 'next/navigation';
import { ChatModal } from '@/components/CustomModals';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { IoCloseOutline } from "react-icons/io5";


const Page = () => {  

  const dispatch = useDispatch();
  const width = getSelector('width');
  const showSidebarSlice = getSelector('sidebar');
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
    console.log(showSidebarSlice)
    console.log(width)
    return ()=> window.removeEventListener('scroll',closeDropdowns);
  },[])
  
  return (
    <>
    <Navbar/>
    <div className={`laptop:flex relative h-fit`}>
    {showSidebarSlice && <div className={`${showSidebarSlice && width<=760 ? 'w-full flex justify-between sidebarOpacity':'laptop:w-[17%] tablet:min-w-[17%]'} fixed z-30 laptop:top-7 tablet:top-14 mobile:top-14`}>
        <SidebarMenu/>  
        <div className='absolute tablet:top-4 mobile:top-4 right-8 text-3xl text-white' onClick={()=>dispatch(showSidebar(false))}><IoCloseOutline/></div>
      </div>}
      <div className={`${showSidebarSlice && width>=760 ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
        <Main/>
      </div>
      {showMessageModal && <ChatModal/>}
      <Toaster/>
    </div>
    </>
  )
}

export default Page;