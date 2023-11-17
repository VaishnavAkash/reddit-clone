import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import Link from 'next/link';
import { MdClose } from "react-icons/md";

const LoginForm = () => {
  return (
    <div className="bg-white text-black flex flex-col w-[28rem] gap-6 px-4 py-4 rounded-lg shadow-lg h-[35rem]">
        <div className="w-full flex justify-end">
            <MdClose className="text-2xl cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Log In</div>
                    <div className="text-sm">By continuing, you are setting up a 
                        Reddit Account and agree to our 
                        <span className="text-blue-600 hover:underline"> User Agreement</span> and 
                        <span className="text-blue-600 hover:underline"> Privacy Policy</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div  className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 ">
                        <FcGoogle className="text-2xl"/> Continue with Google 
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 ">
                        <ImGithub className="text-2xl cursor-pointer"/> Continue with Github
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-[45%] bg-gray-300 h-[2px]"></div>
                OR
                <div className="w-[45%] bg-gray-300 h-[2px]"></div>
            </div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <input className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="text" placeholder="Email" />
                    <input className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="text" placeholder="Password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-full cursor-pointer m-auto text-center py-2 bg-red-500 rounded-full font-semibold text-white">Log In</div>
                    <div className="w-fit m-auto text-sm">New to Reddit? <span className="text-blue-600 cursor-pointer hover:underline">Sign Up</span></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm;