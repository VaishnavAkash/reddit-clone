'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { getSelector } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { setShowLoginModal } from '@/slices/homeSlice';
import { redirect } from 'next/navigation';

const Page = () => {  
  const dispatch = useDispatch();
  const showSidebar = getSelector('sidebar');
  const darkMode = getSelector('darkMode');
  const userLoggedIn = getSelector('userLoggedIn');

  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));  
    redirect('/');
  };
  
  return (
    <div className='laptop:flex relative h-[100vh]'>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full px-8 py-4'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative left-56 top-16`}>
        <Main/>  
      </div>
    </div>
  )
}

export default Page;