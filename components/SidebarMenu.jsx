import {AiOutlineHome} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';
import {MdHotelClass} from 'react-icons/md';
import {MdGames} from 'react-icons/md';
import {FiBarChart2} from 'react-icons/fi';
import ChannelCard from './ChannelCard';

const SidebarMenu=()=>{
    return (
      <div className='border-e-2 border-gray text-sm'>
      <div className='laptop:py-6 px-4 mb-1 border-b-2 border-gray'>
          <div className='laptop:flex cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-200 '>
            <AiOutlineHome className='text-2xl'/>
            Home
          </div>
          <div className='laptop:flex cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-200 '>
            <BsFillArrowUpRightCircleFill className='text-2xl'/>
            Popular
          </div>
      </div>
      <div className='laptop:py-6 px-4 mb-1 border-b-2 border-gray'>
      <div className='laptop:flex cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-200 transform-gpu group'>
            <div className='flex justify-between w-full items-center '>
              <div className='flex gap-2 items-center'>
              <FiBarChart2 className='text-2xl'/>
              RECENT 
              </div>
            <BsChevronDown className='transition-transform transform rotate-0 group-hover:rotate-180'/>
            </div>
          </div>
          <div className='laptop:flex cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-200 transform-gpu group'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex gap-2 items-center'>
              <MdHotelClass className='text-2xl'/>
              TOPICS 
              </div>
            <BsChevronDown className='transition-transform transform rotate-0 group-hover:rotate-180'/>
            </div>
          </div>
          <div className='laptop:flex cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-200 transform-gpu group'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex gap-2 items-center'>
              <MdGames className='text-2xl'/>
              RESOURCES 
              </div>
            <BsChevronDown className='transition-transform transform rotate-0 group-hover:rotate-180'/>
            </div>
          </div>
      </div>
      </div>
    )
  }

export default SidebarMenu;