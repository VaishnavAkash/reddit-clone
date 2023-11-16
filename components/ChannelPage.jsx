'use client';
import Image from 'next/image';
import UserAvatar from '@/assets/userAvatar.webp';
import LoggedInPosts from './LoggedInPosts';
import { LuCakeSlice } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";


const ChannelPage = () => {
  return (
    <div className='flex flex-col gap-8'>
        <div className='flex flex-col w-full h-40 shadow-lg'>
            <div className='bg-green-600 w-full h-[40%]'></div>
            <div className='bg-white w-full h-[60%] flex gap-6 px-4'>
              {/* channel Logo */}
              <div className='px-8 relative top-[-20px] flex justify-center items-center h-full bg-gray-50 border-6 border-black rounded-full'><Image src={UserAvatar} className='w-12 h-12' width='' height='' alt='channel Logo'/></div>
              {/* Channel details */}
              <div >
                <div className='text-2xl flex items-center gap-4'>Node.js Pros <span className='bg-blue-500 text-sm rounded-full text-white px-4 py-1'>Share</span></div>
                <div className='text-gray-600 text-sm'>r/Node.js Pros</div>
              </div>
            </div>
        </div>
        <div className='flex justify-center w-full'>
          <LoggedInPosts/>
        </div>
    </div>
  )
}

export const ChannelDetails=()=>{
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='bg-blue-300 w-full h-10 py-2'></div>
      <div className='bg-white w-full px-6 pb-4 flex flex-col gap-2'>
        {/* First Half */}
        <div>
          <div className='flex items-center'>
            <Image className='w-12 h-12 rounded-full' src={UserAvatar} width='' height='' alt='channel Description Logo'/>
            <div className='text-sm'>r/Node.js Pros</div>
          </div>
          <div className='text-sm text-gray-500'>Discuss the ins and outs of server-side JavaScript. Share tips, best practices, and learn more about Node.js.</div>
          <div className='flex items-center gap-4'><LuCakeSlice/> <span className='text-gray-500'>Created Mon Aug 21 2023</span> </div>
        </div>
        {/* Second Half */}
        <div className='flex justify-between text-sm'>
          <div>
            <div>1.9 M</div>
            <span>Members</span>
          </div>
          <div>
            <div>5.9 K</div>
            <div><span className='text-[4px]'>🟢</span>Online</div>
          </div>
          <div>
            <div>Top 1%</div>
            <span>Ranked by 2k</span>
          </div>
        </div>
        {/* Third Half */}
        <div>
            <div className='w-full bg-blue-400 cursor-pointer text-white rounded-full text-center px-4 py-2'>Share</div>
            <div className='flex items-center gap-4 text-gray-500'>
                <FaEyeSlash className='text-black'/> Community Theme 
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelPage