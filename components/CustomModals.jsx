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
import userLogo from '@/assets/userLogo.webp';
import userAvatar from '@/assets/userAvatar.webp';
import Image from 'next/image';



export const NormalOptionsDropDown = () => {
    const options = [{icon:RxExit,name:'Log In / Sign Up'},{icon:ImBullhorn,name:'Advertise On Reddit'},{icon:FaShopify,name:'Shop Collectible Avatars'}];
  return (
    <div className='bg-white absolute top-[3.1rem] right-0 w-52 px-2 py-2 h-fit shadow-lg rounded-lg'>
        {options?.map((item,idx)=>{
            return <div key={idx} className='hover:bg-gray-100 flex items-center gap-2 cursor-pointer py-2 rounded-lg'><item.icon/> <span className='text-[14px]'>{item.name}</span></div>
        })}
    </div>
  )
}

export const SideBarItems = () =>{

  const itemsArray = [{icon:IoLogoReddit,name:'About Reddit'},{icon:IoIosHelpCircleOutline,name:'Help'},
  {icon:MdMenuBook,name:'Blog'},{icon:TiMicrophone,name:'Press'},{icon:FaUsers,name:'Communities'},
  {icon:TbApps,name:'Topics'},{icon:MdOutlinePrivacyTip,name:'Content Policy'},{icon:FaBalanceScale,name:'Privacy Policy'},
  {icon:FaBalanceScale,name:'User Agreement'}]

  return (
    <div className='w-full'>
       {itemsArray?.map((item,idx)=>{
            return <div key={idx} className='hover:bg-gray-100 flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg'><item.icon className='text-xl'/> <span className='text-sm'>{item.name}</span></div>
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