'use client';
import Image from 'next/image';
import UserAvatar from '@/assets/userAvatar.webp';
import LoggedInPosts from './LoggedInPosts';
import { LuCakeSlice } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getChannelInfo, getSelector } from '@/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@/slices/homeSlice';


const ChannelPage = ({id}) => {
  
  const channelInfo = useSelector(store=>store.homeSlice.channelsData);
  const dispatch = useDispatch();

  async function getData(){
    const data = await getChannelInfo(id);
    dispatch(setData({channels:data})); 
  }

  useEffect(()=>{
    getData();
  },[]);


  return (
    <div className='flex flex-col gap-8'>
        <div className='flex flex-col w-full h-40 shadow-lg'>
            <div className='bg-green-600 w-full h-[40%]'></div>
            <div className='bg-white w-full  h-[60%] flex gap-6 px-4'>
              {/* channel Logo */}
              <div className='relative w-20 h-20 rounded-full'>
                <img src={channelInfo?.image} className='w-full h-full rounded-full border-2 absolute bottom-6 border-white' alt='channel Logo'/>
              </div>
              {/* Channel details */}
              <div >
                <div className='text-2xl flex items-center gap-4'>{channelInfo?.name}<span className='bg-blue-500 text-sm rounded-full text-white px-4 py-1'>Share</span></div>
                <div className='text-gray-600 text-sm'>r/{channelInfo?.name}</div>
              </div>
            </div>
        </div>
        <div className='flex justify-center w-full'>
          <LoggedInPosts id={id} />
        </div>
    </div>
  )
}

export const ChannelDetails=()=>{
  const channel = useSelector(store=>store.homeSlice.channelsData);
  const darkMode = getSelector('darkMode');
  
  return (
    <div className={`bg-white ${darkMode?'text-white':'text-black'} shadow-lg rounded-lg`}>
      <div className='bg-blue-300 w-full h-10 py-2'></div>
      <div className='bg-white w-full px-6 pb-4 flex flex-col gap-2'>
        {/* First Half */}
        <div>
          <div className='flex items-center gap-4'>
            <img className='w-12 h-12 rounded-full' src={channel?.image} width='' height='' alt='channel Description Logo'/>
            <div className='text-sm'>r/{channel?.name}</div>
          </div>
          <div className='text-sm text-gray-500'>{channel?.description}</div>
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
            <div className='flex items-center gap-1'><span className='text-[8px]'>🟢</span>Online</div>
          </div>
          <div>
            <div>Top 1%</div>
            <span>Ranked by 2k</span>
          </div>
        </div>
        {/* Third Half */}
        {/* <div>
            <div className='w-full bg-blue-400 cursor-pointer text-white rounded-full text-center px-4 py-2'>Share</div>
            <div className='flex items-center gap-4 text-gray-500'>
                <FaEyeSlash className='text-black'/> Community Theme 
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default ChannelPage