import { setChatArray, setLiveChatArray } from '@/slices/homeSlice';
import { getSelector } from '@/utils/helper';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const LiveChat = () => {
    const liveChatArray = getSelector('liveChatArray');
    const dispatch = useDispatch();
    const options = {  hour: '2-digit', minute: '2-digit' };
    const chatArray = getSelector('chatArray');
    const chatDivRef = useRef(null); 
    const arrayLengthRef = useRef(0);

    async function getQuote() {
        const res = await fetch('https://type.fit/api/quotes');
        const data = await res.json();
        dispatch(setChatArray(data));
    }

    useEffect(() => {
        getQuote();
    }, []);

    useEffect(()=>{
        
        const key = setInterval(()=>{
            if(arrayLengthRef.current==13) {arrayLengthRef.current = 0};
            dispatch(setLiveChatArray(chatArray[arrayLengthRef.current]));
            arrayLengthRef.current = arrayLengthRef.current+1;
        },2000);

        return ()=> clearInterval(key);
    },[chatArray])

    useEffect(() => {
        if (chatDivRef.current) {
          chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
        }
      }, [chatArray]); 


    return (
        <div ref={chatDivRef} className='flex modal-container flex-col-reverse w-full overflow-y-auto h-[20rem]'>
            {liveChatArray.length > 0 &&
                liveChatArray.map((item,idx) => {
                    return <div key={item?.id || idx}>
                        <div className='flex gap-2 items-center'>
                            <img
                                className='h-10 w-10 rounded-full'
                                src="https://imgs.search.brave.com/gpjzVANMwjTB939eCXVwr8A8havI2Qd_tFtL9nm22_s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NDQ3MDM2ODY5ODEt/YTNhYmJjNGQ0ZmUz/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4T0h4OGNH/bGpkSFZ5Wlh4bGJu/d3dmSHd3Zkh4OE1B/PT0"
                                alt=''
                            />
                            <div className='flex items-center gap-4 text-sm text-gray-400'>{item?.author.split(' ').slice(0,2).join(' ')} {new Date().toLocaleString('en-US', options)}</div>
                        </div>
                        <div className='pl-12'>{item?.text}</div>
                    </div>
                })}
        </div>
    );
};

export default LiveChat;
