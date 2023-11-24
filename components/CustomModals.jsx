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
import userLogo from '@/assets/userLogo.webp';
import userAvatar from '@/assets/userAvatar.webp';
import Image from 'next/image';
import { logOutUser, setLightMode, setShowLoginModal, setViewOptionsWidth } from "@/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSelector, notify } from "@/utils/helper";



export const NormalOptionsDropDown = () => {
  const options = [
    { icon: RxExit, name: 'Log In / Sign Up', clickMethod: handleLoginUser },
    { icon: ImBullhorn, name: 'Advertise On Reddit', clickMethod: notify },
    { icon: FaShopify, name: 'Shop Collectible Avatars', clickMethod: notify}
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

export const UserInfoModal = () =>{
  return (
    <>
        <div>
          <div className="flex items-center">
            <Image className="w-12 h-12 rounded-full" src={userAvatar} width='' height='' alt='userLogo'/>
            <span>u/Carmen Shanahan</span>
          </div>
          <div>
            <Image className="w-44 h-52" src={userLogo} width='' height='' alt='User Avatar'/>
            <div className="text-center text-lg">Carmen Shanahan</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className='flex px-8 text-md text-gray-600 justify-between'>
            <div>
              12  <div>Posts</div>
            </div>
            <div>
              25 <div>Karma</div>
            </div>
          </div>
          <div className='w-full bg-blue-700 rounded-full text-white text-center py-2'>Follow</div>
        </div>
    </>
  )
}

export const ToggleSwitch= ({onClick}) =>{
  const communityTheme = getSelector('communityTheme');
  return <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer"/>
    <div onClick={onClick} className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:${communityTheme}`}></div>
</label>
}

export const LoggedInOptionsModal = () =>{

  const dispatch = useDispatch();
  const MenuData1 = [{name:'Online Status',switch:ToggleSwitch},{name:'Profile',notify:notify},{name:'Style Avatar',notify:{notify}},{name:'User Settings',notify:{notify}}];
  const MenuData2= [{name:'Dark Mode',switch:ToggleSwitch}];
  const MenuData3= [{icon:IoLogoReddit,name:'About Reddit',notify:{notify}},{icon:IoIosHelpCircleOutline,name:'Help',notify:{notify}},
  {icon:MdMenuBook,name:'Blog',notify:{notify}},{icon:TiMicrophone,name:'Press',notify:{notify}},{icon:FaUsers,name:'Communities',notify:{notify}},
  {icon:TbApps,name:'Topics',notify:{notify}},{icon:MdOutlinePrivacyTip,name:'Content Policy',notify:{notify}},{icon:FaBalanceScale,name:'Privacy Policy',notify:{notify}},
  {icon:FaBalanceScale,name:'User Agreement',notify:{notify}},{icon:IoMdExit,name:'Log Out',logOutUserFunc:{logOutUserFunc}}];
  const darkMode = getSelector('darkMode');

  function handleLightMode(){
    dispatch(setLightMode());
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
            return <div key={idx} className={`px-2 text-center flex items-center gap-2 cursor-pointer py-2 rounded-lg  ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
                {item.icon && <item.icon className="text-xl"/>}
                <div onClick={item.notify && notify} className="flex justify-between w-full">
                  <div>{item.name}</div>
                  {item.switch && <item.switch/>}
                </div>
            </div>
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
      <div className="flex flex-col gap-2">{MenuData3?.map((item,idx)=>{
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