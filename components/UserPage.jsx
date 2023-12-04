import { copyClipboardFunc, getSelector, notify } from '@/utils/helper'
import React,{useState} from 'react'
import {BsFire} from 'react-icons/bs';
import { UserInfoModal, ViewOptionsModal } from './CustomModals';
import Image from 'next/image';
import UserAvatar from '../assets/userLogo.webp'
import {FcGallery} from 'react-icons/fc';
import {HiOutlineLink} from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
import {BsChevronDown} from 'react-icons/bs';
import Link from 'next/link';
import {BsPatchCheckFill} from 'react-icons/bs';
import { setUserPageDetails, setViewOptionsDropdown } from '@/slices/homeSlice';
import { CiShare2 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';






const UserPage = ({id}) => {
    const communityTheme = getSelector('communityTheme');
    const userPageDetails = getSelector('userPageDetails');
    const isOnline = getSelector('isOnline');
    const viewOptionsDropdown = getSelector('viewOptionsDropdown');
    const [currentActiveFilter,setCurrentActiveFilter] = useState('Hot');


    function handleViewMode(){
        dispatch(setViewOptionsDropdown(!viewOptionsDropdown));
    }

    function changeCurrentActiveFilter(e){
        setCurrentActiveFilter(e.target.innerText);
      }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col w-full h-40 shadow-lg'>
                <div style={{backgroundColor:communityTheme}} className='w-full h-[40%]'></div>
                <div className='bg-white w-full  h-[60%] flex gap-6 px-4'>
                  {/* channel Logo */}
                  <div className='relative w-20 h-20 rounded-full'>
                    <img src={`https://loremflickr.com/320/240?random=${Math.floor(Math.random()*10)}`} className='w-full h-full rounded-full border-2 absolute bottom-6 border-white' alt='channel Logo'/>
                  </div>
                  {/* Channel details */}
                  <div >
                    <div onClick={copyClipboardFunc} className='cursor-pointer text-2xl flex text-black items-center gap-4'>{id}<span className='bg-blue-500 text-sm rounded-full text-white px-4 py-1'>Share</span></div>
                    <div className='text-gray-600 text-sm'>u/{userPageDetails?.name}</div>
                  </div>
                </div>
            </div>
            <div className='flex justify-center w-full'>
            <div className='laptop:w-[60%] flex flex-col gap-6'>
                <div className={`flex w-full justify-start  rounded-lg items-center gap-4 shadow-md border-[1px] px-2 py-4 border-gray`}>
                  <div className='relative py-1 px-1 bg-gray-400 rounded-full'>
                    <Image src={UserAvatar} alt="userLogo" width={60} height={14} />
                    {isOnline && <p className='bg-green-500 absolute bottom-[0.17rem] right-2 w-2 h-2 rounded-full'></p>}
                  </div>
                    <Link className='w-full' href='/createpost'><input className='cursor-pointer border-2 border-gray w-full px-3 h-10 placeholder:text-black-200' placeholder='Create Post'/></Link>
                    <FcGallery className='cursor-pointer text-3xl'/>
                    <HiOutlineLink className='cursor-pointer text-2xl'/>
                </div>
                <div className='flex w-full items-center'>
                   <UserPosts />
                </div>
              </div>
            </div>
        </div>
      )
}

const UserPosts=()=>{

    const dispatch = useDispatch();
    const userPageDetails = getSelector('userPageDetails');
    const posts = userPageDetails.posts;
    const darkMode = getSelector('darkMode');   

    function removePost(time){
        const deletingPost = posts?.filter((item)=>item?.time != time); 
        dispatch(setUserPageDetails({posts:deletingPost}));
        notify('Post deleted successfully');
    }

    return userPageDetails?.posts?.length==0 || !userPageDetails?.posts ? <div className='w-full h-[10rem] flex items-center justify-center text-2xl font-bold bg-gray-100'>
        No Posts Yet!   
    </div> : <div className={`w-full text-black flex flex-col gap-6 pb-6`}>
        <div className='flex flex-col gap-5'>
        {posts?.map((post,idx)=>{
            return <div key={idx} className='flex py-2 px-2 bg-gray-100 border-2 rounded-lg shadow-lg border-black flex-col w-full h-full'>
                <div className='flex flex-col'>
                    <div className='text-sm text-gray-400'>{post?.time}</div>
                    <div>{post?.title}</div>
                </div>
                <div>{post?.description}</div>
                <div className='flex items-center gap-4'>
                    <div onClick={copyClipboardFunc} className=' cursor-pointer flex items-center gap-1 py-1 text-sm px-2 rounded-full bg-gray-300'>
                        <span><CiShare2/></span>
                        <span>Share</span>
                    </div>
                    <div onClick={()=>removePost(post?.time)} className=' cursor-pointer flex items-center gap-1 py-1 text-sm px-2 rounded-full bg-gray-300'>
                        <span><IoMdRemoveCircleOutline/></span>
                        <span>Remove</span>
                    </div>
                </div>
            </div>
        })}
        </div>
    </div>
}

export default UserPage