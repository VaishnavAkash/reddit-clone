import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="bg-white">
        <div>
            <div>
                <div>Log In</div>
                <div>By continuing, you are setting up a 
                    Reddit Account and agree to our
                    <span>User Agreement</span> and 
                    <span>Privacy Policy</span>
                </div>
            </div>
            <div>
                <div>
                    <FcGoogle/> Continue with Google 
                </div>
                <div>
                    <ImGithub/> Continue with Github
                </div>
            </div>
        </div>
        <div>
            OR
        </div>
        <div>
            <div>
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password"/>
            </div>
            <div>
                <div>Log In</div>
                <div>New to Reddit? <span className="text-blue-600 hover:underline">Sign Up</span></div>
            </div>
            </div>
    </div>
  )
}

export default LoginPage