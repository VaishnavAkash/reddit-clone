'use Client';

import {useState,useEffect} from 'react';
import ChannelList from './ChannelList'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsChevronDown} from 'react-icons/bs'
import Link from 'next/link';
import {  ViewOptionsModal } from './CustomModals';
import NormalPostsList from './PostsList';
import { useDispatch } from 'react-redux';
import { setData, setNavbarDropdown, setShowLoginModal, setViewOptionsDropdown } from '@/slices/homeSlice';
import { getChannels, infiniteScrollPost, getSelector } from '@/utils/helper';
import Loader from './Loader';
import LoginForm from './LoginForm';

const NormalPosts = () => {

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(true);
    const [page,setPage] = useState(1);
    const [infiniteLoader,setInfiniteLoader] = useState(false);
    const posts = getSelector('postsData');
    const userLoggedIn = getSelector('userLoggedIn');
    const showLoginModal = getSelector('showLoginModal');
    const viewOptionsDropdown = getSelector('viewOptionsDropdown');
    const viewOptionsWidth = getSelector('viewOptionsWidth');
    const prevPosts = getSelector('postsData');

  

    async function getData(){
      const data = await Promise.all([infiniteScrollPost(1),getChannels()]);
      dispatch(setData({posts:data[0],channels:data[1]}));
      setLoader(false);
    }

    function handleAuthUser(){
      if(userLoggedIn) dispatch(setShowLoginModal(false));
      else dispatch(setShowLoginModal(true));
    }

    function handleViewMode(){
      dispatch(setViewOptionsDropdown(!viewOptionsDropdown));
  }

    const onScroll = ()=>{
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight
        ){
          setPage(prev=>prev+1)
          if(page<=8) setInfiniteLoader(true)
        }

    }

    async function getInfinitePost(){
      const data = await infiniteScrollPost(page);
      dispatch(setData({posts:[...prevPosts,...data]}));
      setInfiniteLoader(false);
      console.log(data);
      console.log(page);
    }

    useEffect(()=>{
     getData();
    dispatch(setNavbarDropdown(false));
     window.addEventListener('scroll',onScroll);
     return ()=> window.removeEventListener('scroll',onscroll);
    },[])

    useEffect(()=>{
      if(page<=8 && page>1) getInfinitePost(page);
      else setInfiniteLoader(false);
    },[page])

  if(loader) return <Loader/>;

  return showLoginModal  && !userLoggedIn ? <div className='w-[100%] z-[1000] h-[100%] fixed left-0 top-0 flex justify-center items-center backdrop-blur-sm gradient-bg'>
    <LoginForm/>
    </div> : (
    <div className={`laptop:flex text-sm ${viewOptionsWidth=='Card' ?'gap-8 px-8' :'px-4 gap-4'} py-8`}>
      <div className='laptop:w-[70%] z-20 block' >
        <div className="flex justify-between items-center relative bg-white py-2 px-4 rounded-lg">
          <div>
            <Link href='/createpost'><div className="cursor-pointer border-[1px] py-2 font-semibold border-gray-400 px-4 rounded-full hover:bg-black hover:text-white">Create Post</div></Link>
          </div>
            <div className='cursor-pointer flex items-center px-4 py-2 rounded-full'>
            <div onClick={handleViewMode} className="cursor-pointer flex items-center px-4 py-2 rounded-full gap-2 hover:bg-gray-300">
              <GiHamburgerMenu/>
              <BsChevronDown/>  
            </div>
           {viewOptionsDropdown && <ViewOptionsModal/>}
          </div>
        </div>
        <NormalPostsList posts={posts} page={page} infiniteLoader={infiniteLoader} handleAuthUser={handleAuthUser}/>
      </div>
      {/* Right Channel Sidebar */}
        <ChannelList />
    </div>
  )
}

export default NormalPosts;