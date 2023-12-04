import {createSlice} from '@reduxjs/toolkit';

const initialState={
    userLoggedIn : false,
    darkMode : false,
    sidebar: true,
    channelExpand : false,
    postsData: [],
    channelsData:[],
    userDetails:'Akash',
    showLoginModal: false,
    commentPageData:{},
    viewOptionsDropdown: false,
    navbarDropdown: false,
    viewOptionsWidth: 'Card',
    communityTheme: 'red',
    notificationModal: false,
    messageModal: false,
    miniMessageModal: false,
    width:0,
    communityModal:false,
    namesArray: [
        "Aarav",
        "Aditi",
        "Aishwarya",
        "Akshay",
        "Ananya",
        "Aniket",
        "Anita",
        "Arjun",
        "Arpita",
        "Ashok",
        "Ayush",
        "Bhavya",
        "Chetan",
        "Deepak",
        "Divya",
        "Gaurav",
        "Geeta",
        "Hari",
        "Isha",
        "Jyoti",
        "Karan",
        "Kavita",
        "Krishna",
        "Lakshmi",
        "Madhav",
        "Meera",
        "Mohan",
        "Neha",
        "Nikhil",
        "Pooja",
        "Prakash",
        "Priya",
        "Rahul",
        "Raj",
        "Riya",
        "Rohit",
        "Sandeep",
        "Sangeeta",
        "Sanjay",
        "Shilpa",
        "Shiv",
        "Shubham",
        "Sita",
        "Sunil",
        "Suresh",
        "Swati",
        "Tanvi",
        "Uday",
        "Vijay",
        "Vinay",
        "Yogesh",
        "Zara",
        "Abhinav",
        "Aditya",
        "Ayesha",
        "Bhavesh",
        "Chandra",
        "Devi",
        "Dinesh",
        "Ekta",
        "Farhan",
        "Gayatri",
        "Himanshu",
        "Indira",
        "Jatin",
        "Kiran",
        "Kumar",
        "Lalita",
        "Manish",
        "Mitali",
        "Nandini",
        "Om",
        "Pankaj",
        "Rajesh",
        "Rani",
        "Samir",
        "Seema",
        "Tejas",
        "Usha",
        "Varun",
        "Vidya",
        "Yash",
        "Zoya"
      ],      
    customCommunity:{},
    openSearchModal:false,
    isOnline:true,
    chatArray:[],
    postsArray:[],
    userPageDetails: {name:'',posts:[]},
    userPosts:[],
    liveChatArray:[]
}
                   
 const homeSlice = createSlice({
    name:'homeSlice',
    initialState,
    reducers:{
        setLiveChatArray:(state,action)=>{
            state.liveChatArray = [action.payload,...state.liveChatArray];
        },
        setUserPosts:(state,action)=>{
            state.userPosts = action.payload;
        },
        setPostsArray:(state,action)=>{
            state.postsArray = action.payload;
        },
        setChatArray:(state,action)=>{
            state.chatArray = action.payload;
        },
        setIsOnline:(state)=>{
            state.isOnline = !state.isOnline;
        },
        setOpenSearchModal: (state,action)=>{
            state.openSearchModal = action.payload;
        },
        setCustomCommunity: (state,action)=>{
            if(action.payload.name) {
                state.customCommunity.name = action.payload.name;
            }
            if(action.payload.description) {
                state.customCommunity.description = action.payload;
            }
        },
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
                state.postsData = action.payload.posts;
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
        setMessageModal:(state,action)=>{
            state.messageModal = action.payload;
        },
        setNotificationModal:(state,action)=>{
            state.notificationModal = action.payload;
        },
        setMiniMessageModal: (state,action)=>{
            state.miniMessageModal = action.payload;
        },
        setViewOptionsWidth: (state,action)=>{
            state.viewOptionsWidth = action.payload;
        },
        setCommunityTheme: (state,action)=>{
            state.communityTheme = action.payload;
        },
        setWidth: (state,action)=>{
            state.width = action.payload;
        },
        setCommunityModal: (state,action)=>{
            state.communityModal = action.payload;
        },   
        setUserPageDetails: (state,action)=>{
            if(action.payload.name){
                state.userPageDetails.name = action.payload.name;
            }
            if(action.payload.posts){
                state.userPageDetails.posts = action.payload.posts;
            }
        } 
    }
})


export const {loginUser,logOutUser,showSidebar,
    expandChannel,setData,setUserDetails,
    setShowLoginModal,setLightMode,setCommentPageData,
    setViewOptionsDropdown,setNavbarDropdown,
    setViewOptionsWidth,setCommunityTheme,setMessageModal,
    setNotificationModal,setMiniMessageModal,setWidth,
    setCommunityModal,setCommentsMapper,setCustomCommunity,
    setOpenSearchModal,setIsOnline,setChatArray,setPostsArray,
    setUserPageDetails,setUserPosts,setLiveChatArray} = homeSlice.actions;

export default homeSlice.reducer;

