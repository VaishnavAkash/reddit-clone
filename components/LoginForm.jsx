import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { MdClose } from "react-icons/md";
import { handleLoginUser,handleSignUpUser } from "@/utils/helper";
import { useDispatch,useSelector } from "react-redux";
import { loginUser, setShowLoginModal, setUserDetails } from "@/slices/homeSlice";

const LoginForm = () => {
    const dispatch = useDispatch();
    // const loginModal = useSelector(store=>store.homeSlice.showLoginModal);
    const [currentForm,setCurrentForm] = useState(false) //false==Login true==SignUp
    const [name,setName] = useState('');
    const [email,setEmail] = useState('akash@gmail.com');
    const [password, setPassword] = useState('ItsPersonal');

    async function handleSubmit(e){
        // console.log('hello' + currentForm);
        e.preventDefault();
        console.log(email,password);
       if(currentForm) {
        const data = await handleSignUpUser(name,email,password);
        if(data.status) {
            dispatch(loginUser());
            dispatch(setUserDetails(data));
            
        }else{
            
        }
       }
       else {
        const data = await handleLoginUser(email,password);
        if(data.status){
            dispatch(loginUser());
            dispatch(setUserDetails(data));
        }else{

        }
       }
    }

  return (
    <div className={`bg-white text-black flex flex-col w-[28rem] ${currentForm ? 'gap-3' :'gap-6'} px-4 py-4 rounded-lg shadow-lg h-[35rem]`}>
        <div className="w-full flex justify-end">
            <MdClose onClick={()=>dispatch(setShowLoginModal(false))} className="text-2xl cursor-pointer"/>
        </div>
        <div className={`flex flex-col ${currentForm ? 'gap-5' :'gap-10'}`}>
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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    {currentForm && <input onChange={(e)=>setName(e.target.value)} value={name} className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="text" placeholder="Name" />}
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="text" placeholder="Email" />
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="text" placeholder="Password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <button type="submit" onClick={handleSubmit} className="w-full cursor-pointer m-auto text-center py-2 bg-red-500 rounded-full font-semibold text-white">{currentForm ? 'Sign Up':'Log In'}</button>
                    <div className="w-fit m-auto text-sm">{currentForm ? 'Already a member? ':'New to Reddit? '}<span onClick={()=>setCurrentForm(prev=>!prev)} className="text-blue-600 cursor-pointer hover:underline">{!currentForm ? 'Sign Up':'Log In'}</span></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm;