'use client';

import {useState} from 'react';
import ChannelList from './ChannelList'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import { BiCommentDetail } from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsChevronDown} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa';
import LoggedInPosts from './LoggedInPosts';
import { useSelector } from 'react-redux';
import Link from 'next/link';



const PostsList=({posts,channels})=>{
  const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);
  return userLoggedIn ? <LoggedInPosts/> : <NormalPosts posts={posts} channels={channels} />
}


const NormalPosts = ({posts,channels}) => {

    const [genreModal,setGenreModal] = useState(false);
    const [viewMode,setViewMode] = useState(false);
    const [page,setPage] = useState(1);
    const [postList,setPostList] = useState(posts);

    function handleViewMode(){
        setViewMode(prev=>!prev);
    }

    // console.log('hello');

        // async function getInfinitePost(){
        //     setPage(prev=>prev+1);
        //     const data = await getInfiniteScroll(page);
        //     console.log(data);
        //     console.log('hi im called')
        //     setPostList(prev=>[...prev,data]);
        // }

        // const onScroll = ()=>{
        //     if (
        //         window.innerHeight + window.scrollY >= document.body.offsetHeight
        //     ){getInfinitePost()}
        //     else{
        //         console.log('not yet')
        //     }
        // }

        // useEffect(()=>{
        //     window.addEventListener('scroll',onScroll);
        //     return ()=> window.removeEventListener('scroll',onScroll);
        // },[page])

        const genreArray = ['Hot','Best','Top','Popular'];

  return (
    <div className='laptop:flex text-sm gap-8'>
      <div className='laptop:w-[70%] px-8 z-20'>
        <div className="laptop:flex justify-between items-center relative bg-white py-2 px-4 rounded-lg">
          <div>
            <Link href='/createpost'><div className="cursor-pointer border-[1px] py-2 font-semibold border-gray-400 px-4 rounded-full hover:bg-black hover:text-white">Create Post</div></Link>
          </div>
            <div className='cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 '>
              <div onClick={()=>setGenreModal(prev=>!prev)} className='flex items-center relative px-4 py-[0.34rem] rounded-full gap-2 hover:bg-gray-300'>Hot <BsChevronDown/></div>
              {genreModal && <div className='absolute right-[6.6rem] flex flex-col top-8 w-fit h-fit py-2 px-2 rounded-lg bg-white shadow-lg border-[1px] border-gray-200'>
                {genreArray.map(eItem=>{
                return <span className='hover:bg-gray-100 px-6 py-2'>{eItem}</span>
                })}
              </div>}
            <div onClick={handleViewMode} className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
              <GiHamburgerMenu/>
              <BsChevronDown/>  
            </div>
           {viewMode && <div className='absolute right-[-1.8rem] top-8 w-fit h-fit py-2 px-2 rounded-lg bg-white shadow-lg border-[1px] border-gray-200'>
              <div className='font-extrabold'>View</div>
              <div className='flex flex-col'>
                <span className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Card</span>
                <span className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Classic</span>
              </div>
            </div>}
          </div>
        </div>
        <div className="py-6">
        {postList?.map(post=>{
            return <div key={post._id} className="mb-2 bg-white rounded-lg border-b-2 border-gray">
              <div className="cursor-pointer grid gap-2 mb-4 py-4 px-8 rounded-2xl hover:bg-gray-100">
                <div className="flex justify-between gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <img className='rounded-full w-6' src={post?.author?.profileImage} alt='user logo'/>
                    <div className="text-xs">u/{post?.author?.name}</div>
                  </div>
                  <div className="bg-blue-700 px-4 py-1 w-fit text-xs text-white rounded-full hover:bg-blue-800">Join</div>
                </div>
                <div className="text-[13px] font-normal">
                  {post.content}
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center bg-gray-100 rounded-full text-xs font-semibold hover:bg-gray-200 py-2 px-2 gap-2">
                    <BiUpvote className="text-xl cursor-pointer hover:text-red-600"/> {post?.likeCount} <BiDownvote className="text-xl cursor-pointer hover:text-blue-400"/>
                  </div>
                  <div className='flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2 gap-2'><BiCommentDetail className="text-xl cursor-pointer"/></div>
                  <div className="flex items-center bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200 py-2 px-2 gap-2"><FaShareSquare className="text-xl"/> Share</div>
                </div>
              </div>
            </div>
        })}
        </div>
      </div>
      {/* Right Channel Sidebar */}
      <ChannelList channels={channels} />
    </div>
  )
}



export default PostsList;

