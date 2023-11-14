import React from 'react'

const ChannelCard = ({channel}) => {
  return (
    <div  className="flex items-center gap-3 text-sm px-5 py-3 rounded-lg text-sm cursor-pointer hover:bg-gray-200">
                <img src={channel?.image} className="rounded-full w-12 h-12"  alt='user logo'/>
                <div>
                  <div className="text-sm">r/{channel.name}</div>
                  <div className="text-[12px] text-gray-500">69,875,669 members</div>
                </div>
              </div>
  )
}

export default ChannelCard