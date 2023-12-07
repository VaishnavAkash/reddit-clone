'use client';
import {useEffect, useState} from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';
import {MdHotelClass} from 'react-icons/md';
import {MdGames} from 'react-icons/md';
import {FiBarChart2} from 'react-icons/fi';
import Link from 'next/link';
import { SideBarItems } from './CustomModals';
import { useDispatch, useSelector } from 'react-redux';
import {getSelector, notify} from '@/utils/helper.js';
import { showSidebar } from '@/slices/homeSlice';

const SidebarMenu=()=>{

  const [showItems,setShowItems] = useState(false);
  const darkMode = getSelector('darkMode');

  function showMenuItems(){
    setShowItems(prev=>!prev);
  }


    return (
      <div className={`border-e-[1px] px-4 ${darkMode ? 'border-gray-50':'border-gray-100'} text-sm ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} shadow-lg h-[100vh]`}>
      <div className='laptop:py-6 px-4 mb-1 border-b-2 border-gray'>
        <Link href='/'>
          <div className={`${darkMode ? ' text-white hover:text-blue-400' : 'bg-white text-gray-800 hover:bg-gray-100'} flex cursor-pointer  justify-start items-center tablet:gap-4 mobile:gap-2 px-4 py-2 rounded-lg`}>
            <AiOutlineHome className='text-2xl'/>
            Home
          </div>
        </Link>
        <Link href='/popular'>
          <div className={`flex cursor-pointer ${darkMode ? ' text-white hover:text-blue-400' : 'bg-white text-gray-800 hover:bg-gray-100'} tablet:gap-4 mobile:gap-2 justify-start items-center gap-4 px-4 py-2 rounded-lg`}>
            <BsFillArrowUpRightCircleFill className='text-2xl'/>
            Popular
          </div>
        </Link>
      </div>
      <div className='laptop:py-6 px-4 mb-1 border-b-2 border-gray'>
      <div onClick={()=>notify('Feature coming soon...')} className='flex mobile:text-sm tablet:text-md  mobile:gap-6 cursor-pointer justify-start items-center gap-4 px-4 py-2 rounded-lg'>
            <div className='flex justify-between w-full items-center '>
              <div className='flex gap-2 items-center'>
              <FiBarChart2 className='text-2xl'/>
              Recent
              </div>
            <BsChevronDown/>
            </div>
          </div>
          <div onClick={()=>notify('Feature coming soon...')} className='flex mobile:text-sm tablet:text-md cursor-pointer  mobile:gap-6 justify-start items-center gap-4 px-4 py-2 rounded-lg'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex gap-2 items-center'>
              <MdHotelClass className='text-2xl'/>
              Topics 
              </div>
            <BsChevronDown/>
            </div>
          </div>
          <div onClick={showMenuItems} className=' mobile:text-sm flex tablet:text-md flex-col cursor-pointer mobile:gap-6 justify-start items-center gap-4 px-4 py-2 rounded-lg transform-gpu group'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex gap-2 items-center'>
              <MdGames className='text-2xl'/>
              Resources
              </div>
              <BsChevronDown className={`transition-transform transform ${showItems ? 'rotate-180 ease-in-out' : 'rotate-0'}`}/>
            </div>
            {showItems && 
            <div className='w-full px-2'>
              <SideBarItems/>
            </div>
            }
          </div>
      </div>
      </div>
    )
  }

export default SidebarMenu;