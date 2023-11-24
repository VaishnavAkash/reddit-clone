'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import CreatePost from '@/components/CreatePost';
import { getSelector } from '@/utils/helper';

const Page = () => {  

  const showSidebar = getSelector('sidebar');
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
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full px-8 py-4'} relative left-56 top-16`}>
        <CreatePost/>  
      </div>
    </div>
  )
}

export default Page;