import { RxExit } from "react-icons/rx";
import { ImBullhorn } from "react-icons/im";
import { FaShopify } from "react-icons/fa";
import { IoLogoReddit } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { TiMicrophone } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
// import userAvatar from '@/assets/userAvatar.webp';
import Image from 'next/image';
import Link from 'next/link';
import notificationLogo from '@/assets/notificationLogo.png';
import { logOutUser, setChatArray, setCommunityModal, setCustomCommunity, setIsOnline, setLightMode, setLiveChatArray, setMessageModal, setMiniMessageModal, setShowLoginModal, setViewOptionsWidth } from "@/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSelector, notify } from "@/utils/helper";
import { IoSend } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import LiveChat from "./LiveChat";
import { FaLock } from "react-icons/fa";
import { useState } from "react";



export const NormalOptionsDropDown = () => {
  const options = [
    { icon: RxExit, name: 'Log In / Sign Up', clickMethod: handleLoginUser },
    { icon: ImBullhorn, name: 'Advertise On Reddit', clickMethod:()=> notify('Feature coming soon') },
    { icon: FaShopify, name: 'Shop Collectible Avatars', clickMethod: ()=>notify('Feature coming soon')}
  ];

    const dispatch = useDispatch();

    function handleLoginUser(){
      dispatch(setShowLoginModal(true));
    }



  return (
      <div className='bg-white absolute top-[3.1rem] right-0 w-52 px-2 py-2 h-fit shadow-lg rounded-lg'>
        {options?.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={item.clickMethod}
              className='hover:bg-gray-100 flex items-center gap-2 cursor-pointer py-2 rounded-lg'
            >
              <item.icon /> <span className='text-[14px]'>{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

export const SideBarItems = () =>{

  const itemsArray = [{icon:IoLogoReddit,name:'About Reddit'},{icon:IoIosHelpCircleOutline,name:'Help'},
  {icon:MdMenuBook,name:'Blog'},{icon:TiMicrophone,name:'Press'},{icon:FaUsers,name:'Communities'},
  {icon:TbApps,name:'Topics'}]
  const darkMode = useSelector(store=>store.homeSlice.darkMode);

  return (
    <div className='w-full flex flex-col gap-2'>
       {itemsArray?.map((item,idx)=>{
            return <div key={idx} className={`${darkMode ? ' text-white hover:text-blue-400' : 'bg-white text-gray-800 hover:bg-gray-100'} w-full flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg`}><item.icon className='text-xl'/> <span className='text-sm'>{item.name}</span></div>
        })}
    </div>
  )
}


export const ToggleSwitch= ({onClick}) =>{

  const darkMode = getSelector('darkMode');

  return <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={darkMode} value="" class="sr-only peer"/>
    <div onClick={onClick} class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  </label>
  
}

export const ToggleOnlineSwitch= ({onClick}) =>{
  const isOnline = getSelector('isOnline');

  return  <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" checked={isOnline}/>
  <div onClick={onClick} class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
  
}

export const ToggleSwitchPosts= ({onClick}) =>{

  return  <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div onClick={onClick} class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
  
}

export const LoggedInOptionsModal = () =>{


  const dispatch = useDispatch();
  const userDetails = getSelector('userDetails');
  const MenuData1 = [{name:'Online Status',switch:ToggleOnlineSwitch},{name:'Profile'},{name:'Style Avatar',notify:()=>notify('Feature Coming Soon...')},{name:'User Settings',notify:()=>notify('Feature Coming Soon...')}];
  const MenuData2= [{name:'Dark Mode',switch:ToggleSwitch}];
  const MenuData3= [{icon:IoLogoReddit,name:'About Reddit',notify:()=>notify('A Reddit Clone made by Akash...')},{icon:IoIosHelpCircleOutline,name:'Help',notify:()=>notify('Team Reddit Happy to Help you...')},
  {icon:MdMenuBook,name:'Blog',notify:()=>notify('Feature Coming Soon...')},{icon:TiMicrophone,name:'Press',notify:()=>notify('Feature Coming Soon...')},{icon:FaUsers,name:'Communities',notify:()=>notify('Feature Coming Soon...')},
  {icon:TbApps,name:'Topics',notify:()=>notify('Feature Coming Soon...')},{icon:MdOutlinePrivacyTip,name:'Content Policy',notify:()=>notify('Feature Coming Soon...')},{icon:FaBalanceScale,name:'Privacy Policy',notify:()=>notify('Feature Coming Soon...')},
  {icon:FaBalanceScale,name:'User Agreement',notify:()=>notify('Feature Coming Soon...')},{icon:IoMdExit,name:'Log Out',logOutUserFunc:{logOutUserFunc}}];
  const darkMode = getSelector('darkMode');

  function handleIsOnline(){
    dispatch(setIsOnline());
    notify('Switched Online Status Successfully');
  }

  function handleLightMode(){
    dispatch(setLightMode());
    notify('Switched Mode Successfully');
  }

  function logOutUserFunc(){
    dispatch(logOutUser());
    localStorage.removeItem('reddit-userId');
    notify('User Logged Out Successfully');
  }

  return (
    <div  className={`absolute h-[40rem] modal-container overflow-y-scroll top-[3.1rem] text-sm right-0 w-56 px-4 py-2 shadow-lg rounded-lg z-30  ${darkMode ? 'bg-black text-white':'bg-white text-black'}`}>
      <div className="border-b-[2px] border-gray-200 py-4  flex flex-col gap-4">
        <div className="text-gray-300 text-md cursor-default flex items-center gap-2"> <FaUserLarge className="text-xl"/> My Stuff</div>
        <div>{MenuData1?.map((item,idx)=>{
            return <Link key={idx} href={item.name=='Profile'?`/u/${userDetails}`:''}><div className={`px-2 text-center flex items-center gap-2 cursor-pointer py-2 rounded-lg  ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
                {item.icon && <item.icon className="text-xl"/>}
                <div onClick={item?.notify} className="flex justify-between w-full">
                  <div>{item.name}</div>
                  {item.switch && <item.switch onClick={handleIsOnline} />}
                </div>
            </div>
            </Link>
        })}
      </div>
      </div>
      <div className="border-b-[2px] border-gray-200 py-4 flex flex-col gap-4">
        <div className="text-gray-300 text-md flex cursor-default items-center gap-2"><LiaEyeSolid className="text-xl"/> View Options</div>
        <div>{MenuData2?.map((item,idx)=>{
            return <div key={idx} className={`px-2 flex items-center gap-2 cursor-pointer py-2 rounded-lg`}>
                {item.icon && <item.icon className="text-xl"/>}
                <div className="flex justify-between w-full">
                  <div>{item.name}</div>
                  {item.switch && <item.switch onClick={handleLightMode}/>}
                </div>
      </div>
        })}
        </div>
      </div>
      <div className="flex flex-col gap-2 py-2">{MenuData3?.map((item,idx)=>{
           return <div onClick={item.notify ? ()=>notify('Feature coming soon...'):logOutUserFunc} key={idx} className={`px-2 flex items-center gap-2 cursor-pointer py-2 rounded-lg ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
               {item.icon && <item.icon className="text-xl"/>}
               <div className="flex justify-between w-full">
                  <div>{item.name}</div>
                  {item.switch && <item.switch/>}
                </div>
     </div>
      })}
      </div>
    </div>
  )
}

export const ViewOptionsModal=()=>{
  const dispatch =  useDispatch();
  const darkMode = getSelector('darkMode');

  function handleViewWidthModal(e){
    dispatch(setViewOptionsWidth(e.target.innerText));
  }

  return <div className={`absolute right-[-1.8rem] z-30 top-10 w-fit h-fit py-2 px-2 rounded-lg shadow-lg border-[1px] ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} border-gray-200`}>
  <div className='font-extrabold'>View</div>
  <div className='flex flex-col'>
    <span onClick={handleViewWidthModal} className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Classic</span>
    <span onClick={handleViewWidthModal} className='hover:bg-gray-100 px-8 py-2 rounded-lg cursor-pointer'>Card</span>
  </div>
</div>
}

export const NotificationModal= () =>{
  const darkMode = getSelector('darkMode');
  
  return <section className={`shadow-lg absolute top-10 rounded-lg right-5 w-[375px] h-[455px] px-4 py-3 flex flex-col gap-3 ${darkMode?'bg-gray-800 text-white':'bg-white text-black'}`}>
    <div className="text-lg font-bold">Notifications</div>
    <div className="flex flex-col items-center gap-5">
      <Image className="w-30 h-40" src={notificationLogo} height='' width='' alt='Avatar' />
      <div className="flex flex-col text-center gap-2">
        <span className="text-lg font-bold">You don't have any activity</span>
        <span className="text-sm text-gray-600 w-[15rem]">That's ok, maybe you just need the right inspiration. Try posting in r/BlueprintBarn , a popular community for discussion.</span>
      </div>
    </div>
    <Link href='/r/64e5ef9e467bbeae5d846e0b'><div className="w-fit px-3 py-2 bg-blue-400 text-white text-sm m-auto rounded-md">r/Melody Mingle</div></Link>
  </section>
}

export const ChatModal = () =>{
  const dispatch = useDispatch();
  const darkMode = getSelector('darkMode');
  const miniMessageModal = getSelector('miniMessageModal');
  const width = getSelector('width');
  const chatArray = getSelector('chatArray');
  const userDetails = getSelector('userDetails');
  const [chatValue,setChatValue] = useState('');

  function closeMessageModal(){
    dispatch(setMessageModal(false));
  }

  function changeMessageMode(){
    dispatch(setMiniMessageModal(!miniMessageModal));
  }

  function handleAddChat(e){
    e.preventDefault();
    if(chatValue.trim()=='') return;
    dispatch(setLiveChatArray({author:userDetails,text:chatValue}));
    setChatValue('');
  }

  return miniMessageModal ? <div onClick={changeMessageMode} className="flex justify-between items-center hover:bg-gray-100 cursor-pointer fixed laptop:top-[41rem] mobile:top-[41.3rem] text-black right-24 bg-white h-[2rem] border-[2px] border-gray-300 w-[7rem] rounded-lg px-2 z-50">Chat <RxCross1 onClick={closeMessageModal} className="cursor-pointer"/></div> : 
  <section className={`flex fixed laptop:top-[14.6rem] right-0 ${darkMode ? 'bg-black text-white':'bg-white text-black'} h-[28.8rem] border-[2px] border-gray-300 laptop:w-[50rem] tablet:w-[40rem] mobile:w-[30rem] z-50`}>
            <div className="laptop:w-[17rem] tablet:w-[12rem] mobile:w-[8rem] gap-10 border-e-2 border-gray-200">
              <div className="px-2 py-3">Chats</div>
              {/* Content */}
              <div style={{backgroundColor:darkMode?'':'lightgray'}} className={`flex py-3 px-3 items-center w-full gap-4}`}>
                <img className="h-9 w-9 rounded-full mr-2" src='https://imgs.search.brave.com/7x28w_MGWTptv57qdmfzBcqIi3izroMFWMzrhz_nCnQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tcnZp/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzAyL2xv/Z28tb3Blbi1haS5w/bmc' alt='chatLogo'/>
                <div className="flex flex-col text-xs">
                  {width>=1024 && <div className="flex justify-between items-center w-full"><div className="mr-10 text-xs">General</div><div className="text-gray-400 text-[10px]">1.00PM</div></div>}
                  <span className="text-sm">r/OpenAi</span>
                </div>
              </div>
              <div className="bg-white h-fit w-full"></div>
            </div>
            {/* Right */}
            <div className=" laptop:w-[38rem] mobile:w-[22rem] px-4 flex flex-col">
              <div className="h-[10%] flex justify-between items-center">
                <div>General</div>
                <div className="flex items-center gap-4"><FaChevronDown className="cursor-pointer" onClick={changeMessageMode}/> <RxCross1 className="cursor-pointer" onClick={closeMessageModal}/></div>
              </div>
              <div className="h-[80%] w-full">
                <LiveChat/>
              </div>
              <form onSubmit={handleAddChat} className="flex h-[9%]  py-2 gap-4 items-center">
                <input value={chatValue} onChange={(e)=>setChatValue(e.target.value)} autoFocus className="w-[35rem] rounded-full border-2 bg-gray-100 border-gray-500 px-4 py-2 text-sm" type="text" placeholder="Start Chatting..."/>
                <IoSend onClick={handleAddChat} className="text-2xl cursor-pointer"/>
              </form>
            </div>
  </section>
}

export const CreateCommunityModal = ()=>{

  const dispatch = useDispatch();
  const [communityName,setCommunityName] = useState('');
  const darkMode = getSelector('darkMode');
  const communityDataArray = [{name:'Public',desc:'Anyone can view,post and comment to your posts',icon:FaUserLarge},{name:'Restricted',desc:'Anyone can view this community, but only approved users can post',icon:LiaEyeSolid},{name:'Private',desc:'Only approved users can view and submit to this community',icon:FaLock}];

  function handleCloseCommunityModal(){
    dispatch(setCommunityModal(false));
  }

  function createCommunity(){
    dispatch(setCustomCommunity({name:communityName}));
    notify('Wait a While! Creating your subreddit');
    dispatch(setCommunityModal(false));
  }

  return   <div className={`px-4 py-4 rounded-lg shadow-md flex flex-col gap-4 ${darkMode?'bg-gray-800 text-white':'bg-white text-black'}`}>
    <div className="flex flex-col gap-4">
      <div className="flex text-lg w-full justify-between">
        <div>Create a community</div>
        <div><RxCross1 className="text-2xl cursor-pointer" onClick={handleCloseCommunityModal}/></div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div>
            <div className="font-bold">Name</div>
            <div className="text-xs text-gray-400">Community names including capitalization cannot be changed.</div>
          </div>
          <input autoFocus value={communityName} onChange={(e)=>setCommunityName(e.target.value)} className='border-2 border-gray-400 w-full px-3 py-1 rounded-md' type="text" placeholder="r/" />
          <div className="text-sm text-gray-400">21 Characters remaining</div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Community type</div>
          <div className="flex flex-col gap-1">
            {communityDataArray?.map((item,idx)=>{
              return <div key={idx} className="flex items-center gap-2"><input type='radio' name='select mode'/>{<item.icon/>}<span>{item?.name}</span><span>{item?.desc}</span></div>
            })}
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span>Adult Content</span>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" id="" />
          <div className="w-fit px-1 py-1 bg-red-500 text-white">NSFW</div>
          <div>18+ year old community</div>
        </div>
      </div>
      <div className="bg-gray-100 h-10 gap-4 flex justify-end items-center w-full">
        <span onClick={handleCloseCommunityModal} className="border-2 cursor-pointer border-blue-400 px-2 py-1 rounded-full text-blue-400 bg-transparent">Cancel</span>
        <Link href="/r/customCommunity"><span onClick={createCommunity} className="cursor-pointer bg-blue-400 text-white rounded-full px-2 py-1 border-2 border-blue-700 hover:bg-blue-600">Create Community</span></Link>
      </div>
    </div>
  </div>
}

export const SearchModal=()=>{
  const postsData = getSelector('postsData');
  const iterableArray = postsData.slice(0,4);

  return <section className="absolute modal-container text-black left-0 rounded-b-lg top-[2.5rem] w-full h-[30rem] overflow-y-scroll bg-white z-30 flex flex-col px-2 py-2">
    <div className="text-xl font-bold">Trending Today</div>
    <div>
      {iterableArray?.map((data,idx)=>{
    return <Link key={data?._id} href={`/r/${data?._id}/comments/${data?._id}`}>
      <div className="border-b-2 border-blue-200 py-2">
            <div className="flex items-center gap-2">
              <img src={data?.channel?.image} className="w-11 h-11 rounded-full" alt='user logo' />
              <div className="font-bold">r/{data?.channel?.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <div>{data?.content?.substr(0,250)}...</div>
              <img className="w-[10rem] h-[7rem]" src={`https://loremflickr.com/320/240?random=${idx+1}`} alt='post image' />
            </div>
        </div>
      </Link>
      })}
    </div>
  </section>
}