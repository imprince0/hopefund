import React, { useState } from 'react'
import Link from 'next/link'
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
// import {useSession,signIn} from 'next-auth/react'

function SignUp(){

    // const {data:session}=useSession();
    // console.log(session);
    // const host=`http://${process.env.NEXT_PUBLIC_WEB_HOST}:${process.env.NEXT_PUBLIC_WEB_PORT}`
    
    const host=`${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const router=useRouter();
    const [signupcredentials, setSignupcredentials] = useState({ email: "", password: "", cpassword: "" })

    const SignupOnchange = (e) => {
        setSignupcredentials({ ...signupcredentials, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { email, password, cpassword } = signupcredentials
        if (cpassword !== password) {
            setSignupcredentials({ email: signupcredentials.email, password: "", cpassword: "" });
            return;
        }
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('email', email);
            router.push(`${host}/landingPage`);
        }
        else {
            
        }
    };

    return (
        <section className="h-screen mr-5 mt-[-10px]">
            <div className="h-full">
                <div className="flex flex-wrap items-center justify-center h-full g-6 lg:justify-between">
                    <div className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                    </div>
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={handleSignup}>
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 mr-4 text-lg">Continue with</p>
                                <Link href={'/'}>
                                    <BsFacebook size={100} className="mx-1 h-9 w-9 text-[#0066ff]  rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:text-[blue] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:text-[blue] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:text-[#0000ffbe] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                                <Link href={'/'}>
                                    {/* <FcGoogle onClick={()=>signIn()} size={100} className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" /> */}
                                    <FcGoogle size={100} className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                                <Link href={'/'}>
                                    <BsTwitter size={100} className="mx-1 h-9 w-9 text-[#0066ff]  rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:text-[blue] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:text-[blue] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:text-[#0000ffbe] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                            </div>

                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 font-semibold text-center"> Or </p>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input value={signupcredentials.email} onChange={SignupOnchange} type="text"
                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none border-[#9c3353]"
                                    id="email" name='email' placeholder=" " />
                                <label htmlFor="email"
                                    className='pointer-events-none max-w-[90%] absolute top-[-1.4rem] bg-white px-2 py-0 left-[14px] mb-0 origin-[0_0] truncate pt-[0.37rem] text-[#9c3353]'>
                                    Email address
                                </label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input value={signupcredentials.password} onChange={SignupOnchange} type="password"
                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none border-[#9c3353]"
                                    id="password" name="password" placeholder=" " />
                                <label htmlFor="password"
                                    className='pointer-events-none max-w-[90%] absolute top-[-1.4rem] bg-white px-2 left-[14px] mb-0 origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-[#9c3353]'>
                                    Password
                                </label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input value={signupcredentials.cpassword} onChange={SignupOnchange} type="password"
                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none border-[#9c3353]"
                                    id="cpassword" name="cpassword" placeholder=" " />
                                <label htmlFor="cpassword"
                                    className='pointer-events-none max-w-[90%] absolute top-[-1.4rem] bg-white px-2 left-[14px] mb-0 origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-[#9c3353]'>
                                    Confirm Password
                                </label>
                            </div>

                            <div className="text-center lg:text-left">
                                <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                                    className="inline-block text-white rounded bg-[#bd3f65] px-7 pt-3 pb-2.5 text-sm font-medium  leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#9c3353] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[rgb(48_97_175)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[rgb(40_81_146)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                    Create Account
                                </button>
                                <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                                    Already have an account?
                                    <Link href={'/signIn'} className="transition duration-150 ease-in-out text-[rgb(220_76_100)] hover:text-[rgb(212_42_70)] focus:text-[rgb(212_42_70)] active:text-[rgb(187,38,63)]">aSignIn</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUp

// export const getServerSideProps =async=(context)=>{

// }