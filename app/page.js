'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useDispatch, useSelector } from "react-redux";



const Page = () => {  

  const dispatch = useDispatch();
  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  const darkMode = useSelector(store=>store.homeSlice.darkMode);


  return (
    <>
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} laptop:flex relative h-full `}>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full py-4'} relative left-56 top-16`}>
        <Main/>
      </div>
    </div>
    </>
  )
}

export default Page;