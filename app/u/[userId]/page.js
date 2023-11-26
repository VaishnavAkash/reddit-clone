'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getSelector } from '@/utils/helper';
import { redirect } from 'next/navigation';
import { loginUser, setNavbarDropdown, setNotificationModal, setOpenSearchModal, setShowLoginModal, setUserPageDetails, setViewOptionsDropdown, setWidth } from '@/slices/homeSlice';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import UserPage from '@/components/UserPage';

const Page = ({params}) => {  

  const dispatch = useDispatch();
  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  const darkMode = getSelector('darkMode');
  const userLoggedIn = getSelector('userLoggedIn');

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
    <div className={`laptop:flex relative h-[100vh] ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full px-8 py-4'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative left-56 top-16`}>
        <UserPage id={params.userId} />
      </div>
    </div>
    <Toaster/>
    </>
  )
}

export default Page;