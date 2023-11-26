import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { MdClose } from "react-icons/md";
import { handleLoginUser,handleSignUpUser, notify } from "@/utils/helper";
import { useDispatch,useSelector } from "react-redux";
import { loginUser, setShowLoginModal, setUserDetails } from "@/slices/homeSlice";
import Loader,{LoginFormLoader} from "./Loader";
import Link from 'next/link';
import {auth,googleProvider,githubProvider} from '@/config.js';
import { signInWithPopup } from "firebase/auth";

const LoginForm = () => {
    const dispatch = useDispatch();
    // const loginModal = useSelector(store=>store.homeSlice.showLoginModal);
    const [currentForm,setCurrentForm] = useState(false) //false==Login true==SignUp
    const [name,setName] = useState('');
    const [email,setEmail] = useState('akash@gmail.com');
    const [password, setPassword] = useState('ItsPersonal');
    const [submitBtnLoader,setSubmitBtnLoader] = useState(false);
    const [loader,setLoader] = useState(true);

    async function handleSubmit(e){
        setSubmitBtnLoader(true);
        e.preventDefault();
        console.log(email,password);
       if(currentForm) {
        const data = await handleSignUpUser(name,email,password);
        if(data.status=='success') {
            dispatch(loginUser());
            dispatch(setUserDetails(data?.data?.user?.name));
            console.log('inside signup')
        }else{
            notify('Enter a Valid Email and Password')
        }
       }
       else {
        const data = await handleLoginUser(email,password);
        if(data.status=='success'){
            console.log('inside login')
            dispatch(loginUser());
            dispatch(setUserDetails(data?.data?.name));
        }else{
            notify('Enter a Valid Email and Password')
        }
    }
    setSubmitBtnLoader(false);
    }

    function handleGoogleAuth(){
        signInWithPopup(auth,googleProvider).then(res=>{
            console.log('loggedInUser');
            dispatch(loginUser());
            dispatch(setUserDetails(res?.user?.displayName));
        }).catch(err=>{
            console.log(err);
        })
    }

    function handleGithubAuth(){
        signInWithPopup(auth,githubProvider).then(res=>{
            console.log('loggedInUser');
            dispatch(loginUser());
            dispatch(setUserDetails(res?.user?.displayName));
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false);
        },1000);
    },[])


  return (
    <div className={`bg-white text-black flex flex-col w-[28rem] ${currentForm ? 'gap-3' :'gap-6'} px-4 py-4 rounded-lg shadow-lg h-[35rem]`}>
        {loader ? <Loader/> :
        <>
        <div className="w-full flex justify-end">
            <MdClose onClick={()=>dispatch(setShowLoginModal(false))} className="text-2xl cursor-pointer"/>
        </div>
        <div className={`flex flex-col ${currentForm ? 'gap-5' :'gap-10'}`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Log In</div>
                    <div className="text-sm">By continuing, you are setting up a 
                        Reddit Account and agree to our 
                        <Link href='https://www.redditinc.com/policies/user-agreement'><span className="text-blue-600 hover:underline"> User Agreement</span></Link> and 
                        <Link href='https://www.reddit.com/policies/privacy-policy'><span className="text-blue-600 hover:underline"> Privacy Policy</span></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div onClick={handleGoogleAuth} className="flex hover:bg-sky-100 items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 ">
                        <FcGoogle className="text-2xl"/> Continue with Google 
                    </div>
                    <div onClick={handleGithubAuth} className="flex hover:bg-sky-100 items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 ">
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
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" type="email" placeholder="Email" />
                    <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} className="flex items-center gap-3 cursor-pointer bg-gray-100 rounded-full text-black px-4 py-2 outline-blue-400" placeholder="Password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <button type="submit" onClick={handleSubmit} className="w-full cursor-pointer m-auto text-center py-2 bg-red-500 rounded-full font-semibold text-white">{submitBtnLoader ? <LoginFormLoader/> : currentForm ? 'Sign Up':'Log In'}</button>
                    <div className="w-fit m-auto text-sm">{currentForm ? 'Already a member? ':'New to Reddit? '}<span onClick={()=>setCurrentForm(prev=>!prev)} className="text-blue-600 cursor-pointer hover:underline">{!currentForm ? 'Sign Up':'Log In'}</span></div>
                </div>
            </form>
        </div>
        </>
        }
    </div>
  )
}

export default LoginForm;