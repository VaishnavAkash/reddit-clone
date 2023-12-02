'use client';
import LoggedInPosts from './LoggedInPosts';
import { LuCakeSlice } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { changeCommunityTheme, copyClipboardFunc, getAuthor, getChannelInfo, getSelector } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { setCommunityTheme, setCustomCommunity, setData } from '@/slices/homeSlice';
import { ToggleSwitch } from './CustomModals';

const ChannelPage = ({id}) => {
  
  const dispatch = useDispatch();
  const channelInfo = getSelector('channelsData');
  const userDetails = getSelector('userDetails');
  const communityTheme = getSelector('communityTheme');
  const customCommunity = getSelector('customCommunity');

  async function getChannelData(){
    if(id!=userDetails){
      const data = await getChannelInfo(id);
      dispatch(setData({channels:data}));
    }
    else return;
  }

  function clearCustomCommunity(){
    dispatch(setCustomCommunity({name:''}));
  }
 
  useEffect(()=>{
    if(window.location.pathname.includes('r/') && id!='customCommunity') getChannelData();
    else return;

    return ()=>clearCustomCommunity();
  },[]);


  return (
    <div className='flex flex-col gap-8'>
        <div className='flex flex-col w-full h-40 shadow-lg'>
            <div style={{backgroundColor:communityTheme}} className='w-full h-[40%]'></div>
            <div className='bg-white w-full  h-[60%] flex gap-6 px-4'>
              {/* channel Logo */}
              <div className='relative w-20 h-20 rounded-full'>
                <img src={channelInfo?.image || `https://loremflickr.com/320/240?random=${Math.floor(Math.random()*10)}`} className='w-full h-full rounded-full border-2 absolute bottom-6 border-white' alt='channel Logo'/>
              </div>
              {/* Channel details */}
              <div >
                <div onClick={copyClipboardFunc} className='cursor-pointer text-2xl flex items-center gap-4'>{customCommunity?.name || channelInfo?.name}<span className='bg-blue-500 text-sm rounded-full text-white px-4 py-1'>Share</span></div>
                <div className='text-gray-600 text-sm'>r/{customCommunity?.name || channelInfo?.name}</div>
              </div>
            </div>
        </div>
        <div className='flex justify-center w-full'>
          <LoggedInPosts id={id}/>
        </div>
    </div>
  )
}

export const ChannelDetails=({id})=>{
  const dispatch = useDispatch();
  const channel = getSelector('channelsData');
  const darkMode = getSelector('darkMode');
  const communityTheme = getSelector('communityTheme');
  const customCommunity = getSelector('customCommunity');
  const [communityDesc,setCommunityDesc] = useState('');
  
  function changeBgColors(){
    const color = changeCommunityTheme();
    dispatch(setCommunityTheme(color));
  }

  

  return (
    <div className={`${darkMode?'text-white':'text-black'} shadow-lg rounded-lg`}>
      <div style={{backgroundColor:communityTheme}} className={`z-50 w-full h-10 py-2`}></div>
      <div className='bg-white w-full px-6 pb-4 flex flex-col gap-2'>
        {/* First Half */}
        <div>
          <div className='flex items-center gap-6'>
            <img className='w-12 h-12 rounded-full' src={channel?.image || `https://loremflickr.com/320/240?random=${Math.floor(Math.random()*10)}`} width='' height='' alt='channel Description Logo'/>
            <div className='text-sm'>r/{customCommunity?.name || channel?.name}</div>
          </div>
          {!id=='customCommunity' ? <div className='text-sm text-gray-500'>{channel?.description}</div> : <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, eius.</div>}
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
        <div className='flex flex-col gap-4'>
            <div onClick={copyClipboardFunc} className='w-full bg-blue-400 cursor-pointer text-white rounded-full bg- text-center flex flex-col gap-3 px-4 py-2'>Share</div>
            <div className='flex items-center gap-4 text-gray-500'>
                <FaEyeSlash className='text-black'/> Community Theme <ToggleSwitch onClick={changeBgColors} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelPage