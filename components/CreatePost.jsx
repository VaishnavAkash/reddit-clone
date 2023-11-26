import React, { useState } from 'react'
import Image from 'next/image';
import UserAvatar from '@/assets/userAvatar.webp';
import { SlNote } from "react-icons/sl";
import Link from 'next/link';
import { IoAdd } from "react-icons/io5";
import { getSelector, notify } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { setUserPageDetails, setUserPosts } from '@/slices/homeSlice';

const CreatePost = () => {

    const darkMode = getSelector('darkMode');
    const dispatch = useDispatch();
    const rulesArray = ['1. Remember the human','2. Behave like you would in real life','3. Look for the original source of content','4. Search for duplicates before posting','5. Follow Ethics and Modularity']
    const width = getSelector('width');
    const userPageDetails = getSelector('userPageDetails');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const options = {  hour: '2-digit', minute: '2-digit' ,  second: '2-digit' };


    function addUserPost(){
        console.log(userPageDetails.posts);
        const posts = userPageDetails.posts;
        dispatch(setUserPageDetails({posts:[...posts,{time:new Date().toLocaleString('en-US', options),title:title,description:description}]}));
        notify('Post added Successfully');
        setTitle('');
        setDescription('');
    }
    
  return (
    <div className={`flex relative top-4 w-full px-24 gap-8 text-black`}>
        <div className={` ${width>1023 ? 'w-[70%]':'w-full'} flex flex-col gap-4`}>
            <div className='w-full flex rounded-lg shadow-lg px-8 py-4 bg-white'>
                <div className='w-full'>Create A Post</div>
                <div className='flex gap-2'>Drafts <span>0</span></div>
            </div>
            <div className='flex items-center w-fit rounded-lg bg-white shadow-lg py-2 px-4'><Image className='w-10 rounded-full' src={UserAvatar} />User Name</div>
            <div className='w-full flex flex-col rounded-lg'>
                <div className='flex w-full justify-between bg-white rounded-lg'>
                    <div className='flex gap-2 items-center justify-center py-4 cursor-pointer border-b-2 border-r-2 w-1/4 border-blue-800'><SlNote/> Post</div>
                    {/* <div className='flex gap-2 items-center justify-center py-4 cursor-pointer active:border-b-2 w-1/4 border-blue-800'><FaRegImages/> Image</div>
                    <div className='flex gap-2 items-center justify-center py-4 cursor-pointer active:border-b-2 w-1/4 border-blue-800'><FiLink/> Link</div>
                    <div className='flex gap-2 items-center justify-center py-4 cursor-pointer active:border-b-2 w-1/4 border-blue-800'><BiPoll/> Poll</div> */}
                </div>
                <div className='flex flex-col  py-4 gap-4'>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)}  className={`w-full px-8 py-2 rounded-lg outline-gray-400 ${darkMode?'border-gray-600':'border-gray-300'} border-2`} placeholder='Title' type="text" />
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className={`resize-none px-8 py-2 ${darkMode?'border-gray-600':'border-gray-300'} border-2 outline-gray-400 w-full h-44 rounded-lg`} placeholder='Description'></textarea>
                    <div className='flex laptop:gap-4 gap-3 border-b-2 border-gray-300 py-2'>
                        <div className={`flex items-center cursor-not-allowed gap-2 px-3 py-1 ${darkMode?'text-white':'text-black'} rounded-full border-[1px] border-gray-400`}><IoAdd/>OC</div>
                        <div className={`flex items-center cursor-not-allowed gap-2 px-3 py-1 ${darkMode?'text-white':'text-black'} rounded-full border-[1px] border-gray-400`}><IoAdd/>Spoiler</div>
                        <div className={`flex items-center cursor-not-allowed gap-2 px-3 py-1 ${darkMode?'text-white':'text-black'} rounded-full border-[1px] border-gray-400`}><IoAdd/>NSFW</div>
                        {width>800 && <div className={`flex items-center cursor-not-allowed gap-2 px-3 py-1 ${darkMode?'text-white':'text-black'} rounded-full border-[1px] border-gray-400`}><IoAdd/>Flair</div>}
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Link href={`/u/${userPageDetails?.name}`}><div onClick={addUserPost} className={`px-3 py-1 rounded-full border-[1px] border-gray-400 hover:bg-blue-700 hover:text-white cursor-pointer ${darkMode?'text-white':'text-black'}`}>Post</div></Link>
                    </div>
                    <div className='w-full h-32 flex flex-col px-8 justify-center bg-white rounded-lg shadow-md'>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='cursor-pointer' />
                            <div>Send Me Post Reply By Notifications</div>
                        </div>
                        <div className='text-blue-700'>Connect accounts to share your posts</div>
                    </div>
                </div>
            </div>
        </div>
       {width>=1024 && <div className='w-[30%] sticky top-20 bg-white h-fit px-3 py-4 rounded-lg shadow-lg'>
            <div className='py-2  gap-2 flex flex-col'>
                <div className='flex items-center'>
                    <Image className='w-8' src={UserAvatar} width='' height='' alt='userlogo'/>
                    Posting to Reddit
                </div>
               {
                rulesArray?.map((eItem,idx)=>{
                    return <div key={idx} className='text-sm border-b-[1px] border-gray-300'>{eItem}</div>
                })
               }
            </div>
        </div>}
    </div>
  )
}

export default CreatePost;