'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import { useDispatch } from "react-redux";
import CommentsPage from '@/components/CommentsPage';
import { getSelector } from '@/utils/helper';
import { setShowLoginModal } from '@/slices/homeSlice';
import { redirect } from 'next/navigation';

const Page = ({params}) => {  
  
  const dispatch = useDispatch();
  const showSidebar = getSelector('sidebar');
  const darkMode = getSelector('darkMode');
  const userLoggedIn = getSelector('userLoggedIn');

  if(!userLoggedIn) {
    dispatch(setShowLoginModal(true));  
    redirect('/');
  };


  return (
    <div className={`laptop:flex relative h-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] left-[18rem]' : 'w-full left-3'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative top-[5rem] h-[100%]`}>
        <CommentsPage id={params.postId}/>
      </div>
    </div>
  )
}

export default Page;