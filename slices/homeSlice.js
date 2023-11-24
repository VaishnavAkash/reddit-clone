import {createSlice} from '@reduxjs/toolkit';

const initialState={
    userLoggedIn : false,
    darkMode : false,
    sidebar: true,
    channelExpand : false,
    postsData: [],
    channelsData:[],
    userDetails:{},
    showLoginModal: false,
    commentPageData:{},
    viewOptionsDropdown: false,
    navbarDropdown: false,
    viewOptionsWidth: 'Card',
    communityTheme: 'bg-rose-400',
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
        },
        setData: (state,action)=>{
            if(action.payload.posts){
                state.postsData = [...state.postsData,...action.payload.posts];
            };
            if(action.payload.channels){
                state.channelsData = action.payload.channels;
            }
        },
        setUserDetails:(state,action)=>{
            state.userDetails = action.payload;
        },
        setShowLoginModal:(state,action)=>{
            if(state.userLoggedIn) return;
            state.showLoginModal = action.payload;
        },
        setLightMode: (state)=>{
            state.darkMode = !state.darkMode;
        },
        setCommentPageData: (state, action) => {
            if (action.payload.post) {
              state.commentPageData.post = action.payload.post;
            }
            if (action.payload.comments) {
              state.commentPageData.comments = action.payload.comments;
            }
        },
        setViewOptionsDropdown:(state,action)=>{
            state.viewOptionsDropdown = action.payload;
        },
        setNavbarDropdown:(state,action)=>{
            state.navbarDropdown = action.payload;
        },
        setViewOptionsWidth: (state,action)=>{
            state.viewOptionsWidth = action.payload;
        },
        setCommunityTheme:(state,action)=>{
            console.log(action.payload);
            console.log(`bg-${action.payload}-400`);
            state.communityTheme = `bg-${action.payload}-400`;
        },
    }
})


export const {loginUser,logOutUser,showSidebar,
    expandChannel,setData,setUserDetails,
    setShowLoginModal,setLightMode,setCommentPageData,
    setViewOptionsDropdown,setNavbarDropdown,
    setViewOptionsWidth,setCommunityTheme} = homeSlice.actions;

export default homeSlice.reducer;

