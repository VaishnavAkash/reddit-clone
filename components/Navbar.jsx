'use client';

import Image from 'next/image';
import Logo from '@/assets/reddit-logo-full.webp';
import LogoSm from '@/assets/reddit-logo-sm.webp';
import UserLogo from '@/assets/userLogo.webp';
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
import { setShowLoginModal , showSidebar } from '@/slices/homeSlice';
import { LoggedInOptionsModal, NormalOptionsDropDown } from './CustomModals';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  return userLoggedIn ? <LoggedInNavbar/> : <RegularNavbar/>
}

const LoggedInNavbar = () =>{

  const dispatch= useDispatch();
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  const userDetails= useSelector(store=>store.homeSlice.userDetails);
  const darkMode = useSelector(store=>store.homeSlice.darkMode);

  function handleShowSidebar(){
    dispatch(showSidebar());
  }

 return (
  <div className={`laptop:flex items-center text-sm justify-between w-full gap-4 px-8 py-[2px] fixed border-b-2 border-gray top-0 ${darkMode ? 'bg-black text-white':'bg-white text-black'} z-[100]`}>
    <div className='laptop:flex w-[25%] items-center gap-4'>
    <RxHamburgerMenu onClick={handleShowSidebar} className='text-lg cursor-pointer'/>
        <Link href='/'><Image className='cursor-pointer' priority={false} src={Logo} width={110} height={10} alt='reddit-logo'/></Link>
        <div className={`laptop:cursor-pointer flex items-center gap-4 justify-between w-fit px-4 py-2 ${darkMode ? 'bg-black text-white':'bg-white text-black hover:bg-gray-50'}`}>
          <div className='laptop:flex items-center gap-2'>
          <AiFillHome className='text-xl'/>
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
        <Link href='/popular'><BsArrowRightCircle className='text-2xl cursor-pointer hover:text-blue-400'/></Link>
        <AiOutlineMessage className='text-2xl cursor-pointer hover:text-blue-400'/>
        <IoMdNotificationsOutline className='text-2xl cursor-pointer hover:text-blue-400'/>
        <Link href='/createpost'><AiOutlinePlus className='text-2xl cursor-pointer hover:text-blue-400'/></Link>
        <div className={`laptop:flex cursor-pointer  ${darkMode ? 'bg-black border-[1px] border-blue-400 hover:text-blue-400':'bg-gray-100 text-black'} items-center py-2 px-4 gap-2 rounded-full`}>
          <CiBullhorn className='text-2xl'/>
          Advertise
         </div> 
    </div>
    <div className={`laptop:flex w-[13%] justify-between items-center ps-2 cursor-pointer  ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
      <div className='laptop:flex'>
      <Image src={UserLogo} priority={false} width={45} height={15} alt='user Logo'/>
        <div className=''>
          <div>{userDetails?.data?.name}</div>
          <div className='flex'><GiPunchBlast/> 13 Karma</div>
        </div>
      </div>
        <div className='flex items-center'>
          <BsChevronDown/>
        </div>
        {userLoggedIn && <LoggedInOptionsModal/>}
    </div>
  </div>
 )

}

const RegularNavbar = () =>{
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);

  function handleLogin(){
    console.log('btn clc')
    dispatch(setShowLoginModal(true));
  }

  function handleShowSidebar(){
    dispatch(showSidebar());
  }
  

  return (
    <div className='laptop:flex items-center text-sm justify-between w-full gap-4 px-8 py-3 fixed border-b-2 border-gray top-0 bg-white z-[100]'>
      <div className='laptop:w-[10rem] flex gap-4 items-center'>
        <RxHamburgerMenu onClick={handleShowSidebar} className='text-lg cursor-pointer'/>
        <Image className='cursor-pointer' priority={false} src={Logo} width={110} height={10} alt='reddit-logo'/>
      </div>
      <div className='laptop:flex items-center w-[50rem] py-2 px-4 rounded-full gap-4 bg-gray-100 border-[1px] hover:border-blue-400 '>
        <GoSearch/>
        <input className='laptop:w-full bg-transparent outline-none' placeholder='Search Reddit'/>
      </div>
      <div className='laptop:flex w-[16rem] justify-between'>
        <div className='laptop:flex items-center px-4 py-2 gap-3 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300'>
            <BsQrCodeScan/>
            Get App
          </div>
          <div onClick={handleLogin} className='laptop:py-2 px-4 bg-red-500 text-white rounded-3xl cursor-pointer hover:bg-red-700'>
            Log In
          </div>
          <div  className='flex relative items-center cursor-pointer text-lg px-2 py-2 hover:bg-gray-200 rounded-[100%]'>
            <PiDotsThreeBold />
            {!userLoggedIn && <NormalOptionsDropDown/>}
            {/* {!userLoggedIn && <LoggedInOptionsModal/>} */}
          </div>
      </div>
    </div>
  )
}

export default Navbar;
