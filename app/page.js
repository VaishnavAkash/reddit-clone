'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useSelector } from "react-redux";
import LoginForm from '@/components/LoginForm';

const Page = () => {  

  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  
  return (
    <div className='laptop:flex relative h-full'>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full px-8 py-4'} relative left-56 top-16`}>
        <Main/>
      </div>
      {/* {!userLoggedIn && <div className='w-[100%] backdrop-blur-lg z-20 h-[100%] fixed top-4 flex justify-center items-center'><LoginForm/></div>} */}
    </div>
  )
}

export default Page;