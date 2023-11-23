import {createSlice} from '@reduxjs/toolkit';

{/* <div>

// const [page,setPage] = useState(1);
// const [postList,setPostList] = useState(posts);



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
                        </div> */}


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
                state.postsData = action.payload.posts
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
          }
    }
})

export const {loginUser,logOutUser,showSidebar,
    expandChannel,setData,setUserDetails,
    setShowLoginModal,setLightMode,setCommentPageData} = homeSlice.actions;

export default homeSlice.reducer;

