'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { FcReddit } from "react-icons/fc";
import CommentsPage from '@/components/CommentsPage';



const Page = () => {  

  const dispatch = useDispatch();
  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  const darkMode = useSelector(store=>store.homeSlice.darkMode);
  const notify = () => toast('Hello World', {
    duration: 2500,
    position: 'bottom-center',
  
    // Styling
    style: {},
    className: 'w-fit px-4',
  
    // Custom Icon
    icon: <FcReddit className='text-2xl'/>,
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });;


  return (
    <>
    <div  className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} laptop:flex relative h-fit`}>
      {showSidebar && <div onClick={notify} className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full py-4'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} relative left-56 top-16`}>
        <Main/>
      </div>
      <Toaster/>
    </div>
    </>
  )
}

export default Page;