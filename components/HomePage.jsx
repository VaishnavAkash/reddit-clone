'use client';

import React from 'react'
import Sidebar from './SidebarMenu.jsx';
import Main from './Main.jsx';
import { useSelector } from "react-redux";

const HomePage = () => {

  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  
  return (
    <div className='laptop:flex relative h-[100vh]'>
      {/* {showSidebar && <div className='w-[17%] fixed top-12'>
        <Sidebar/>
      </div>} */}
      <div className='w-[83%] px-16 py-4 relative left-56 top-16'>
        <Main/>
      </div>
    </div>
  )
}





export default HomePage;