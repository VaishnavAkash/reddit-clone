import { API_INFINITE_SCROLL, API_POSTS } from "@/utils/constants";
import { API_COMMUNITIES } from "@/utils/constants";
import { projectID } from "@/utils/constants";

export const getPosts= async()=>{
    const res = await fetch(API_POSTS,{
        headers:{
            projectID
        }
    })
    const data= await res.json();
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