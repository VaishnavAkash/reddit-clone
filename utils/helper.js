import { API_INFINITE_SCROLL, API_MAX_POSTS, API_POSTS, AUTHOR_API, COMMENTS_API } from "@/utils/constants";
import { API_COMMUNITIES } from "@/utils/constants";
import { projectID } from "@/utils/constants";
import { useSelector } from "react-redux";
import { FcReddit } from "react-icons/fc";
import toast from "react-hot-toast";
import { headers } from "@/next.config";

export const getSelector = (value) => useSelector(store=>store.homeSlice[value]);

export const changeCommunityTheme = () =>{
  const colors= ['red','green','blue','pink','voilet','orange','aquamarine','lime','teal','indianred','indigo'];
  return colors[Math.floor(Math.random()*colors.length)];
}

export const getPosts= async()=>{
    const res = await fetch(API_MAX_POSTS,{
        headers:{
            projectID
        }
    })
    const data= await res.json();

    return data.data; 
}

export const getSinglePost = async(id)=>{
  const res = await fetch(API_POSTS+id,{
    headers:{
        projectID
    }
})
const data= await res.json();

return data.data; 
}

export const infiniteScrollPost = async(page)=>{
    const res = await fetch(API_INFINITE_SCROLL+page,{
      headers:{
        projectID
      }
    })
    const data = await res.json();
    return data.data;
}

export const getChannels = async()=>{
  const res = await fetch(API_COMMUNITIES,{
    headers:{
      projectID
    }
  })
  const data = await res.json();
  return data.data
}

export const getCarousel= async()=>{
  const res = await fetch(API_INFINITE_SCROLL+6,{
      headers:{
          projectID
      }
  })
  const data= await res.json();
  return data.data; 
}

export const getChannelInfo = async(name) =>{
  const res = await fetch('https://academics.newtonschool.co/api/v1/reddit/channel/'+name,{
    headers:{
      projectID
    }
  });
  const data = await res.json();
  // console.log(data);
  return data.data;
}

export async function handleLoginUser(email,password){
  console.log('hi im inside login ')
  const res = await fetch('https://academics.newtonschool.co/api/v1/user/login',{
  method : "POST",
  headers : {
    'Content-Type': 'application/json',
    projectID
  },
  body:JSON.stringify({
    email,
    password,
    appType: 'reddit'
  })
})
  const data = await res.json();
  localStorage.setItem('reddit-token',data?.token);
  localStorage.setItem('reddit-userId',data?.data?._id);
  console.log(data);
  return data;
}

export async function handleSignUpUser(name,email,password){
  console.log('hi im inside')
  const res = await fetch('https://academics.newtonschool.co/api/v1/user/signup',{
  method : "POST",
  headers : {
    'Content-Type': 'application/json',
    projectID
  },
  body:JSON.stringify({
    name,
    email,
    password,
    appType: 'reddit'
  })
  })
  const data = await res.json();
  localStorage.setItem('reddit-token',data.token);
  localStorage.setItem('reddit-userId',data._id);
  console.log(data);
  return data;
}

export const getComments= async(id)=>{

  console.log(id);

    const res = await fetch(`${COMMENTS_API+id}/comments`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('reddit-token')}`,
            projectID
        }
    })
    const data= await res.json();
    return data.data; 
}

export const getAuthor = async(id) =>{
    const res = await fetch(AUTHOR_API+id,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('reddit-token')}`,
        projectID
      }
    })
    const data = await res.json();
    return data.data;
}


export function notify(content='Feature coming soon...'){
  toast(content, {
    duration: 2500,
    position: 'bottom-center',
  
    // Styling
    style: {paddingLeft:'2rem',paddingRight:'2rem',fontWeight:'bolder'},
    className: 'w-[4rem]',
  
    // Custom Icon
    icon: <FcReddit className='text-3xl'/>,
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  }
  )};

  export function copyClipboardFunc(){
    navigator.clipboard.writeText(window.location.href);
    notify('Link Copied to Clipboard');
  }

  export  function handlePostShare(id){
    navigator.clipboard.writeText(window.location.href+'r/'+id+'/comments/'+id);
    notify('Path copied to clipboard');
  }

  // export const addComment = async (id, value) => {
  //   const res = await fetch('https://academics.newtonschool.co/api/v1/reddit/comment/' + id, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('reddit-token')}`,
  //       'projectID': projectID
  //     },
  //     body: JSON.stringify({
  //       'content': value
  //     })
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  
  