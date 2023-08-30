import React, { useState } from 'react'
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SignIn({logged}) {
    // const host=`http://${process.env.NEXT_PUBLIC_WEB_HOST}:${process.env.NEXT_PUBLIC_WEB_PORT}`
    const host=`${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const router=useRouter();

    const [logincredentials, setlogincredentials] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password} = logincredentials
        const response = await fetch(`${host}/api/auth/fetchUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password})
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('email', email);
            router.push(`${host}/landingPage`)
            console.log(json)
        }
        else {
            alert("Invalid credentials");
        }
    };
    
    const LoginonChange = (e) => {
        setlogincredentials({ ...logincredentials, [e.target.name]: e.target.value });
    }
    return (
        <section className="h-screen mr-5">
            <div className="h-full">
                <div className="flex flex-wrap items-center justify-center h-full g-6 lg:justify-between">
                    <div className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full" alt="Sample image" />
                    </div>
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 mr-4 text-lg">Sign in with</p>
                                <Link href={'/'}>
                                    <BsFacebook size={100} className="mx-1 h-9 w-9 text-[#0066ff]  rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:text-[blue] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:text-[blue] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:text-[#0000ffbe] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                                <Link href={'/'}>
                                    <FcGoogle size={100} className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                                <Link href={'/'}>
                                    <BsTwitter size={100} className="mx-1 h-9 w-9 text-[#0066ff]  rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:text-[blue] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:text-[blue] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:text-[#0000ffbe] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)" />
                                </Link>
                            </div>

                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 font-semibold text-center">
                                    Or
                                </p>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    value={logincredentials.email} onChange={LoginonChange}
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none border-[#9c3353]"
                                    id="email" name='email'
                                    placeholder=" " />
                                <label
                                    htmlFor="email"
                                    className='pointer-events-none max-w-[90%] absolute
                                    top-[-1.4rem] bg-white px-2 left-[14px] mb-0 origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-[#9c3353]
                                '>Email address
                                </label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    value={logincredentials.password} onChange={LoginonChange}
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none border-[#9c3353]"
                                    id="password" name="password"
                                    placeholder=" " />
                                <label
                                    htmlFor="password"
                                    className='pointer-events-none max-w-[90%] absolute
                                    top-[-1.4rem] bg-white px-2 left-[14px] mb-0 origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-[#9c3353]'
                                >Password
                                </label>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-[#9c3353] checked:bg-[#9c3353] checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck2" />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="exampleCheck2">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    type="submit"
                                    className="inline-block text-white rounded bg-[#bd3f65] px-7 pt-3 pb-2.5 text-sm font-medium  leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#9c3353] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[rgb(48_97_175)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[rgb(40_81_146)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    LOGIN
                                </button>
                                <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                                    Don't have an account?
                                    <Link
                                        href={'/signUp'}
                                        className="transition duration-150 ease-in-out text-[rgb(220_76_100)] hover:text-[rgb(212_42_70)] focus:text-[rgb(212_42_70)] active:text-[rgb(187,38,63)]"
                                    >Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn