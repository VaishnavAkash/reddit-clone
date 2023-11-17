'use client';

import SidebarMenu from '@/components/SidebarMenu.jsx';
import Main from '@/components/Main';
import { useSelector } from "react-redux";
import ChannelPage from '@/components/ChannelPage';

const Page = ({params}) => {  

  const showSidebar = useSelector(store=>store.homeSlice.sidebar);
  console.log(params.channel);
  
  return (
    <div className='laptop:flex relative h-[100vh]'>
      {showSidebar && <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>}
      <div className={`${showSidebar ? 'w-[83%] px-16 py-4' : 'w-full px-8 py-4'} relative left-56 top-16`}>
        {params.channel ? <ChannelPage id={params.channel} /> : <Main />}
      </div>
    </div>
  )
}

export default Page;