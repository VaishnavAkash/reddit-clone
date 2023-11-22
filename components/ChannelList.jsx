'use client';

import { expandChannel } from '@/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux'
import ChannelCard from './ChannelCard';
import Link from 'next/link';

const ChannelList = ({handleAuthUser}) => {

    const dispatch = useDispatch();
    const channelExpand = useSelector(store=>store.homeSlice.channelExpand);
    const channelSlice= useSelector(store=>store.homeSlice.channelsData);

    const channels = !channelExpand ? channelSlice.slice(0,5) : channelSlice;

    function handleChannelList(){
        dispatch(expandChannel());
    }

  return (
      <div onClick={handleAuthUser} className={`laptop:w-[30%] overflow-x-hidden overflow-y-auto rounded-lg scroll modal-container ${channelExpand ? 'h-[37.5rem]' :'h-fit'} px-2 py-6 my-6 gap-8 sticky top-20 bg-gray-100`}>
        <h2 className="font-extrabold text-gray-500">Popular Communities</h2>
        <div>
          {channels?.map(channel=>{
            return <Link href={`/r/${channel?._id}`} key={channel?._id}><ChannelCard channel={channel}/></Link>
          })}
          <div onClick={handleChannelList} className="cursor-pointer text-xs font-extrabold text-gray-500 rounded-full px-2 py-1 w-fit hover:bg-gray-200" >{channelExpand?'See Less':'See All'}</div>
        </div>
      </div>
  )
}

export default ChannelList;