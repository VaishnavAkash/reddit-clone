'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getSelector } from '@/utils/helper';
import { redirect } from 'next/navigation';
import { loginUser, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setShowLoginModal, setUserPageDetails, setViewOptionsDropdown, setWidth, showSidebar } from '@/slices/homeSlice';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import UserPage from '@/components/UserPage';
import { ChatModal } from '@/components/CustomModals';
import Navbar from '@/components/Navbar';
import { IoCloseOutline } from "react-icons/io5";


const Page = ({params}) => {  

  const dispatch = useDispatch();
  const width = getSelector('width');
  const showSidebarSlice = getSelector('sidebar');
  const darkMode = getSelector('darkMode');
  const userLoggedIn = getSelector('userLoggedIn');
  const showMessageModal = getSelector('messageModal');

  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));
    redirect('/')
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
 dispatch(setUserPageDetails({name:params.userId}));
 return ()=> window.removeEventListener('resize',resize);
},[])
  
  return (
    <>
    <Navbar/>
    <div className={`laptop:flex relative h-fit`}>
      {showSidebarSlice && <div className={`${showSidebarSlice && width<=760 ? 'w-full flex justify-between sidebarOpacity':'laptop:w-[17%] tablet:min-w-[17%]'} fixed z-30 laptop:top-7 tablet:top-14 mobile:top-14`}>
        <SidebarMenu/>  
        <div className='absolute tablet:top-4 mobile:top-8 right-8 text-3xl text-white' onClick={()=>dispatch(showSidebar(false))}><IoCloseOutline/></div>
      </div>}
      <div className={`${showSidebarSlice && width>=760 ? 'w-[83%] tablet:left-[14.1rem] laptop:left-[16rem] mobile:left-[11rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%] py-4`}>
        <UserPage id={params.userId} />
      </div>
      {showMessageModal && <ChatModal/>}
      <Toaster/>
    </div>
    </>
  )
}

export default Page;