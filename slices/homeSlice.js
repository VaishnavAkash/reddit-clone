import {createSlice} from '@reduxjs/toolkit';

const initialState={
    userLoggedIn : false,
    lightMode : true,
    channelList:[],
    postList:[],
    sidebar: true,
    channelExpand : false,
}

const homeSlice = createSlice({
    name:'homeSlice',
    initialState,
    reducers:{
        loginUser : (state)=>{
            state.userLoggedIn = true;
        },
        logOutUser : (state)=>{
            state.userLoggedIn = false;
        },
        expandChannel :(state)=>{
            state.channelExpand= !state.channelExpand;
        },
        showSidebar: (state)=>{
            state.sidebar= !state.sidebar;
        }
    }
})

export const {loginUser,logOutUser,showSidebar,expandChannel,setChannelList,setPostList} = homeSlice.actions;
export default homeSlice.reducer;

