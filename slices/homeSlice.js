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
    lightMode : true,
    sidebar: true,
    channelExpand : false,
    postsData: [],
    channelsData:[],
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
            state.postsData = action.payload.posts;
            state.channelsData = action.payload.channels;
        },
    }
})

export const {loginUser,logOutUser,showSidebar,expandChannel,setData} = homeSlice.actions;
export default homeSlice.reducer;

