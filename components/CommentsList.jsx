import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const CommentsList = () => {
  const comments = useSelector(store=>store.homeSlice.commentPageData.comments); 

    // async function getData(){
    //     const author = await getAuthor(); 
    // }

  return (
    <div className='flex flex-col'>
        {comments?.map(eItem=>{
            return <div className='flex flex-col gap-2'>
                <div className='flex gap-2 '>
                    <img src={''} alt='logo' />
                    <span>Name</span>
                    <span>Date of Comment</span>
                </div>
                <div className='mr-4 border-l-[2px] pt-20 border-gray-400'>{eItem?.content}</div>
            </div>
        })}
    </div>
  )
}

export default CommentsList