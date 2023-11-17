'use client';

import { expandChannel } from '@/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux'
import ChannelCard from './ChannelCard';

const ChannelList = ({channels}) => {

    const dispatch = useDispatch();
    const channelExpand = useSelector(store=>store.homeSlice.channelExpand);

    function handleChannelList(){
        dispatch(expandChannel());
    }

  return (
      <div className={`laptop:w-[30%] overflow-auto rounded-lg scroll h-fit px-2 py-6 my-6 gap-8 sticky top-16 bg-gray-100`}>
        <h2 className="font-extrabold text-gray-500">Popular Communities</h2>
        <div>
          {channels?.map((channel,idx)=>{
            if(!channelExpand && idx>=5) return null;
            return <ChannelCard key={channel?._id} channel={channel} />
          })}
          <div onClick={handleChannelList} className="cursor-pointer text-xs font-extrabold text-gray-500 rounded-full px-2 py-1 w-fit hover:bg-gray-200" >{channelExpand?'See Less':'See All'}</div>
        </div>
      </div>
  )
}

export default ChannelList;