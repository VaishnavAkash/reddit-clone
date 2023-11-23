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
import { setLightMode, setShowLoginModal } from "@/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";



export const NormalOptionsDropDown = () => {
    const options = [{icon:RxExit,name:'Log In / Sign Up'},{icon:ImBullhorn,name:'Advertise On Reddit'},{icon:FaShopify,name:'Shop Collectible Avatars'}];
    const dispatch = useDispatch();

    function handleLoginUser(){
      dispatch(setShowLoginModal(true));
    }



  return (
    <div className='bg-white absolute top-[3.1rem] right-0 w-52 px-2 py-2 h-fit shadow-lg rounded-lg'>
        {options?.map((item,idx)=>{
            return <div key={idx} onClick={item.name.includes('Log In') && handleLoginUser} className='hover:bg-gray-100 flex items-center gap-2 cursor-pointer py-2 rounded-lg'><item.icon/> <span className='text-[14px]'>{item.name}</span></div>
        })}
    </div>
  )
}

export const SideBarItems = () =>{

  const itemsArray = [{icon:IoLogoReddit,name:'About Reddit'},{icon:IoIosHelpCircleOutline,name:'Help'},
  {icon:MdMenuBook,name:'Blog'},{icon:TiMicrophone,name:'Press'},{icon:FaUsers,name:'Communities'},
  {icon:TbApps,name:'Topics'},{icon:MdOutlinePrivacyTip,name:'Content Policy'},{icon:FaBalanceScale,name:'Privacy Policy'},
  {icon:FaBalanceScale,name:'User Agreement'}]
  const darkMode = useSelector(store=>store.homeSlice.darkMode);

  return (
    <div className='w-full flex flex-col gap-2'>
       {itemsArray?.map((item,idx)=>{
            return <div key={idx} className={`${darkMode ? 'bg-gray-700 text-white hover:text-blue-400' : 'bg-white text-gray-800 hover:bg-gray-100'} w-full flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg`}><item.icon className='text-xl'/> <span className='text-sm'>{item.name}</span></div>
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
  return <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer"/>
    <div onClick={onClick} className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
}

export const LoggedInOptionsModal = () =>{
  const dispatch = useDispatch();
  const MenuData1 = [{name:'Online Status',switch:ToggleSwitch},{name:'Profile'},{name:'Style Avatar'},{name:'User Settings'}];
  const MenuData2= [{name:'Dark Mode',switch:ToggleSwitch}];
  const MenuData3= [{icon:IoLogoReddit,name:'About Reddit'},{icon:IoIosHelpCircleOutline,name:'Help'},
  {icon:MdMenuBook,name:'Blog'},{icon:TiMicrophone,name:'Press'},{icon:FaUsers,name:'Communities'},
  {icon:TbApps,name:'Topics'},{icon:MdOutlinePrivacyTip,name:'Content Policy'},{icon:FaBalanceScale,name:'Privacy Policy'},
  {icon:FaBalanceScale,name:'User Agreement'},{icon:IoMdExit,name:'Log Out'}];
  const darkMode = useSelector(store=>store.homeSlice.darkMode);

  function handleLightMode(){
    dispatch(setLightMode());
  }

  return (
    <div  className={` absolute h-[40rem] modal-container overflow-y-scroll top-[3.1rem] text-sm right-0 w-56 px-4 py-2 shadow-lg rounded-lg z-30  ${darkMode ? 'bg-black text-white':'bg-white text-black hover:bg-gray-50'}`}>
      <div className="border-b-[2px] border-gray-200 py-4  flex flex-col gap-4">
        <div className="text-gray-300 text-md cursor-default flex items-center gap-2"> <FaUserLarge className="text-xl"/> My Stuff</div>
        <div>{MenuData1?.map((item,idx)=>{
            return <div key={idx} className={`px-2 text-center flex items-center gap-2 cursor-pointer py-2 rounded-lg  ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
                {item.icon && <item.icon className="text-xl"/>}
                <div className="flex justify-between w-full">
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
           return <div key={idx} className={`px-2 flex items-center gap-2 cursor-pointer py-2 rounded-lg ${darkMode ? 'bg-black text-white hover:text-blue-400':'bg-white text-black hover:bg-gray-50'}`}>
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

