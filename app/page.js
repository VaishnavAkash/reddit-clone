'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { loginUser, setNavbarDropdown, setUserDetails, setViewOptionsDropdown } from '@/slices/homeSlice';
import { useEffect } from 'react';
import { getAuthor, getSelector } from '@/utils/helper';



const Page = () => {  

  const dispatch = useDispatch();
  const showSidebar = getSelector('sidebar');
  const darkMode = getSelector('darkMode');



  const closeDropdowns = () =>{
     dispatch(setViewOptionsDropdown(false));
     dispatch(setNavbarDropdown(false));
  }

  const handleAutoLoginUser=async()=>{
    if(localStorage.getItem('reddit-userId')){
      dispatch(loginUser());
      const userDetails = await getAuthor(localStorage.getItem('reddit-userId'));
      console.log(userDetails);
      dispatch(setUserDetails(userDetails));
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',closeDropdowns);
    handleAutoLoginUser();
    return ()=> window.removeEventListener('scroll',closeDropdowns);
  },[])

  return (
    <>
    <div  className={` laptop:flex relative h-fit`}>
      {showSidebar && <div className='w-[17%] fixed z-30 top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] left-[16.1rem]' : 'w-full left-0'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative  top-[3rem] h-[100%]`}>
        <Main/>
      </div>
      <Toaster/>
    </div>
    </>
  )
}

export default Page;