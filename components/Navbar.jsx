'use client';

import React, { useEffect } from 'react'
import Image from 'next/image';
import Logo from '@/assets/reddit-logo-full.webp';
import LogoSm from '@/assets/reddit-logo-sm.webp';
import UserLogo from '@/assets/UserLogo.webp';
import {GoSearch} from 'react-icons/go';
import {BsQrCodeScan} from 'react-icons/bs';
import {PiDotsThreeBold} from 'react-icons/pi';
import {AiFillHome} from 'react-icons/ai';
import {BsChevronDown} from 'react-icons/bs';
import {BsArrowRightCircle} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {AiOutlineMessage} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {CiBullhorn} from 'react-icons/ci';
import {GiPunchBlast} from 'react-icons/gi';
import { useSelector,useDispatch } from 'react-redux';
import Link from 'next/link';
import { loginUser } from '@/slices/homeSlice';

const Navbar = () => {
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);

  console.log(userLoggedIn);

const lightMode= useSelector(store=>store.homeSlice.lightMode);

  return userLoggedIn ? <LoggedInNavbar/> : <RegularNavbar/>
}

const LoggedInNavbar = () =>{

 return (
  <div className='laptop:flex items-center text-sm justify-between w-full gap-4 px-8 py-[2px] fixed border-b-2 border-gray top-0 bg-white z-[100]'>
    <div className='laptop:flex w-[25%] items-center gap-4'>
        <Link href='/'><Image className='cursor-pointer' src={Logo} width={110} height={10} alt='reddit-logo'/></Link>
        <div className='laptop:cursor-pointer flex justify-between w-full px-4 py-2 hover:bg-gray-50'>
          <div className='laptop:flex items-center gap-2'>
          <AiFillHome className='text-2xl'/>
            Home
          </div>
          <div className='flex items-center'>
          <BsChevronDown/>
          </div>
        </div>

    </div>
    <div className='laptop:flex items-center w-[62%] justify-center gap-4'>
      <div className='laptop:flex items-center w-[70%] py-2 px-4 bg-gray-200 rounded-full gap-4 hover:bg-gray-100 border-[1px] hover:border-blue-400'>
        <GoSearch/>
        <input className='laptop:w-[100%] bg-transparent outline-none' placeholder='Search Reddit'/>
      </div>
        <BsArrowRightCircle className='text-2xl cursor-pointer hover:text-blue-400'/>
        <AiOutlineMessage className='text-2xl cursor-pointer hover:text-blue-400'/>
        <IoMdNotificationsOutline className='text-2xl cursor-pointer hover:text-blue-400'/>
        <AiOutlinePlus className='text-2xl cursor-pointer hover:text-blue-400'/>
        <div className='laptop:flex cursor-pointer  bg-slate-100 items-center py-2 px-4 gap-2 rounded-full hover:bg-slate-200'>
          <CiBullhorn className='text-2xl'/>
          Advertise
         </div>
    </div>
    <div className='laptop:flex w-[13%] justify-between items-center ps-2 cursor-pointer hover:bg-gray-50'>
      <div className='laptop:flex'>
      <Image src={UserLogo} width={45} height={15}/>
        <div className=''>
          <div>Akash</div>
          <div className='flex'><GiPunchBlast/> 13 Karma</div>
        </div>
      </div>
        <div className='flex items-center'>
          <BsChevronDown/>
        </div>
    </div>
  </div>
 )
}

const RegularNavbar = () =>{
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);

  function handleLogin(){
    console.log('first')
    dispatch(loginUser());
  }
  

  return (
    <div className='laptop:flex items-center text-sm justify-between w-full gap-4 px-8 py-3 fixed border-b-2 border-gray top-0 bg-white z-[100]'>
      <div className='laptop:w-[10rem]'>
      <Image className='cursor-pointer' src={Logo} width={110} height={10} alt='reddit-logo'/>
      </div>
      <div className='laptop:flex items-center w-[50rem] py-2 px-4 bg-white rounded-full gap-4 hover:bg-gray-100 border-[1px] hover:border-blue-400 '>
        <GoSearch/>
        <input className='laptop:w-full bg-transparent outline-none' placeholder='Search Reddit'/>
      </div>
      <div className='laptop:flex w-[16rem] gap-4'>
        <div className='laptop:flex items-center px-4 py-2 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300'>
            <BsQrCodeScan/>
            Get App
          </div>
          <div onClick={handleLogin} className='laptop:py-2 px-4 bg-red-500 text-white rounded-3xl cursor-pointer hover:bg-red-700'>
            Log In
          </div>
          <div className='flex items-center cursor-pointer text-lg px-2 py-2 hover:bg-gray-200 rounded-[100%]'>
            <PiDotsThreeBold />
          </div>
      </div>
    </div>
  )
}

export default Navbar;
