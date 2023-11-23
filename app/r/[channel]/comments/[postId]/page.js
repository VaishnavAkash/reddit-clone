'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import { useSelector } from "react-redux";
import CommentsPage from '@/components/CommentsPage';
import { getSelector } from '@/utils/helper';

const Page = ({params}) => {  

  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  const darkMode = getSelector('darkMode');

  return (
    <div className={`laptop:flex relative h-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full py-4'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative left-56 top-16`}>
        <CommentsPage id={params.postId}/>
      </div>
    </div>
  )
}

export default Page;