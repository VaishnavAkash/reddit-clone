'use client';

import { useSelector } from 'react-redux';
import LoggedInPosts from './LoggedInPosts';
import NormalPosts from './NormalPosts';


const Main= ()=>{
    const userLoggedIn = useSelector(store=>store.homeSlice.userLoggedIn);

    return (
        !userLoggedIn ? <NormalPosts/> : <LoggedInPosts/>
    );
  }

export default Main;