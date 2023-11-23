import { API_INFINITE_SCROLL, API_POSTS, AUTHOR_API, COMMENTS_API } from "@/utils/constants";
import { API_COMMUNITIES } from "@/utils/constants";
import { projectID } from "@/utils/constants";
import { useSelector } from "react-redux";

export const getSelector = (value) => useSelector(store=>store.homeSlice[value]);
export const getPosts= async(id='')=>{
    const res = await fetch(API_POSTS+id,{
        headers:{
            projectID
        }
    })
    const data= await res.json();
    console.log(data.data);
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
  console.log(name)
  const res = await fetch('https://academics.newtonschool.co/api/v1/reddit/channel/'+name,{
    headers:{
      projectID
    }
  });
  const data = await res.json();
  console.log(data);
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
  localStorage.setItem('reddit-token',data.token);
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
    console.log(data);
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
    console.log(data);
    return data.data;
  }