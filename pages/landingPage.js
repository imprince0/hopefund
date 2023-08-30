import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { FaHandHoldingHeart, FaStethoscope } from 'react-icons/fa'
import { GiCandleLight } from 'react-icons/gi'
import { MdOutlineCall } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import CircularProgressBar from '../components/CircularProgressBar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FundraiseRequests from '../models/FundraiseRequests'
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LandingPage = () => {
    let [loggedStatus,setLoggedStatus]=useState(false);

    const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const [data, setData] = useState({});
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});
    const [search, setSearch] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [requesterPhone, setRequesterPhone] = useState('');
    const [requesterName, setRequesterName] = useState('');
    const [requesterfundraise, setRequesterFundraise] = useState('medical');
    const [requesterlanguage, setRequesterLanguage] = useState('english');
    const [selected, setSelected] = useState('medical');

    const handleNameChange = (event) => {
        setRequesterName(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setRequesterPhone(event.target.value);
    }
    const handleFundraiseChange = (event) => {
        setRequesterFundraise(event.target.value);
    }
    const handleLanguageChange = (event) => {
        setRequesterLanguage(event.target.value);
    }

    const [searching, setSearching] = useState(false);
    const [searchedData, setSearchedData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedStatus(true);
            console.log("setting true",loggedStatus)
        } else {
            setLoggedStatus(false);
            console.log("setting false",loggedStatus)
        }


        if (localStorage.getItem("paymentInitiated") == "true") {
            toast.error('⚠ Payment Failed! Please Try Again...', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            localStorage.removeItem("paymentInitiated");
            localStorage.removeItem("amount");
        }
        const fetchData = async () => {
            const response = await fetch(`${host}/api/getFundraisers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            // console.log("JSON", json);
            if (json.success) {
                console.log("data", json.data)
                console.log("data1", json.data1)
                console.log("data2", json.data2)
                console.log("data3", json.data3)
                setData(JSON.parse(JSON.stringify(json)));
                setData1(JSON.parse(JSON.stringify(json)));
                setData2(JSON.parse(JSON.stringify(json)));
                setData3(JSON.parse(JSON.stringify(json)));
                // console.log("here", data);
            }
        }
        fetchData();
    }, [isOpen, selected])

    useEffect(() => {

    }, [search])


    let finaldata1 = data.data1;
    let finaldata2 = data.data2;
    let finaldata3 = data.data3;


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setSearching(false);
        }
    }

    const handleSubmit = async (e) => {
        const response = await fetch(`${host}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requesterPhone: requesterPhone, requesterName: requesterName, requesterfundraise: requesterfundraise, requesterlanguage: requesterlanguage })
        });
        const json = await response.json();

        setRequesterName('')
        setRequesterPhone('')
        setRequesterFundraise('')
        setRequesterLanguage('')
        setIsOpen(false);

        toast.success('Our executive will contact you soon.', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
    }

    const [finalSearchedData, setFinalSearchedData] = useState({});

    const Searcher = () => {
        const fetchData = async () => {
            const response = await fetch(`${host}/api/getSearchedFundraiser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: search }),
            });
            const json = await response.json();

            if (json.success) {
                console.log("data", json)
                setSearchedData(JSON.parse(JSON.stringify(json)));
                setFinalSearchedData(json.data);
                setSearching(true);
            }
        }
        fetchData();
    }
    return (
        <>
            {console.log("herere",loggedStatus)}
            <Navbar navtype={"landing"} loginStatus={loggedStatus} />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <div className='mt-[80px]'>
                <div className="flex items-center justify-center font-sans">
                    <div className='mt-[-10px] mx-auto ml-[150px] w-[40%]'>
                        <div>
                            <h1 className='font-[500] text-5xl text-[#212121]'>HopeFund</h1>
                            <h5 className='text-[#5d5d5d] font-[500] text-md mx-36 mt-[-4px]'>Your Generosity Creates Hope.</h5>
                        </div>
                        <div>
                            <h3 className='mt-12 text-[22px] text-[#414040]'>Free Crowdfunding For India</h3>
                        </div>
                        <div className='text-[#5d5d5d] font-[400] text-[16px] mt-2'>Raise funds online for medical emergencies and social causes</div>
                        <div className='flex justify-center items-center my-6 w-[313px] h-[50px] rounded-3xl text-[20px] p-4 font-[500] bg-[#9c3353] hover:bg-[#b8355c] text-white'>
                            <Link href={'/setupFundraiser'}>Start a fundraiser - it's FREE</Link>
                        </div>
                    </div>

                    <div className='ml-auto cursor-default z-[-1] '>
                        <Image className='scale-[1.15] h-auto mr-10 mt-[-80px]' style={{ width: "auto" }} width={500} priority={100} height={500} src={"/assets/bgImage.jpg"} alt="op" />
                    </div>
                </div>

                <div className='mb-12'>
                    <h1 className='text-[#212121] text-3xl text-center mb-5'>Thousands are fundraising online on HopeFund</h1>
                    <p className='text-center leading-[0.5] m-0 mb-[2em] text-[#5d5d5d]'>
                        <span className='inline-block relative before:content-[""] before:right-[100%] 
                        before:mr-[54px] before:absolute before:h-[5px] before:border-b-[1px] before:border-solid before:border-[#707070] before:top-[5px] before:w-[120px] before:opacity-[0.53] 
                        after:content-[""] after:left-[100%] after:ml-[54px] after:absolute after:h-[5px] after:border-b-[1px] after:border-solid after:border-[#707070] after:top-[5px] after:w-[120px] after:opacity-[0.53]'>
                            <span className='inline-block relative w-[18px] h-[18px] bg-[#9c3353] rotate-45 
                            before:top-[27px] before:left-[-21px] before:content-[""] before:absolute before:bg-[#691a47] before:w-[11px] before:h-[11px] before:opacity-[0.53] 
                            after:top-[-21px] after:right-[-21px] after:content-[""] after:absolute after:bg-[#691a47] after:w-[11px] after:h-[11px] after:opacity-[0.53]'></span>
                        </span>
                    </p>
                </div>

                <div className="relative flex justify-center mb-[4rem]">
                    <input type="text" onChange={handleSearchChange}
                        className="inline-block min-h-[auto] w-[40%] rounded-tl-full rounded-bl-full border-2 bg-transparent py-[0.32rem] px-5 leading-[2.15] outline-none border-[#9c3353] shadow-[0_0_30px_0_rgba(156,51,83,0.2)]"
                        value={search}
                        id="search" name='search' placeholder="Search by fundraiser name, title, location, cause or other keywords" />
                    <button onClick={Searcher} className='bg-[#9c3353] px-4 rounded-tr-full rounded-br-full'>
                        <AiOutlineSearch color='white' size={30} />
                    </button>
                </div>
                <div className='flex justify-center mb-10'>
                    <div onClick={() => { setSelected("medical") }} className={`flex flex-col ${selected === "medical" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center h-[150px] w-[200px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}><FaStethoscope size={50} className={`my-4 ${selected === "medical" ? "text-white" : "text-black"}`} /> Medical</div>
                    <div onClick={() => { setSelected("memorial") }} className={`flex flex-col ${selected === "memorial" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center h-[150px] w-[200px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}><GiCandleLight size={50} className={`my-4 ${selected === "memorial" ? "text-white" : "text-black"}`} /> Memorial</div>
                    <div onClick={() => { setSelected("non-profit") }} className={`flex flex-col ${selected === "non-profit" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center h-[150px] w-[200px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}><FaHandHoldingHeart size={50} className={`my-4 ${selected === "non-profit" ? "text-white" : "text-black"}`} /> Non-Profit</div>
                </div>

                {/* Cards */}
                <div className='relative flex flex-wrap mx-[130px] justify-center'>
                    {searching && finalSearchedData && finalSearchedData.slice(0, 6).map((item) => {
                        return (
                            <div key={item._id} className="cursor-pointer mx-3 mb-5 h-[530px] hover:shadow-[0_0_20px_0_rgba(156,51,83,0.3)] shadow-[0_0_30px_0_rgba(156,51,83,0.2)] w-[30%] bg-white border border-gray-200 rounded-lg relative">
                                <Link href={`/fundraiser/${item.slug}`}>
                                    {item.includeTaxBenefit === "true" &&
                                        <div className="absolute top-0 left-[-5px] px-2 py-1 bg-[#9c3353] text-white rounded-tr-lg rounded-bl-lg transform overflow-hidden">Tax Benefit</div>
                                    }

                                    <img className="w-[100%] aspect-[1.33] rounded-t-lg" src={`/coverImg/${item.fundraiserTitle}.${item.extension2}`} alt="" />
                                    <div className="px-5 mb-5 h-[50px] mt-[20px]">
                                        <h5 className="h-[50px] text-[1.3rem] font-[500] tracking-tight text-gray-500">{item.fundraiserTitle}</h5>
                                    </div>

                                    <div className='flex pl-5 h-[90px]'>
                                        <div> <CircularProgressBar percentage={Math.ceil(100 * (item.amountRaised / item.amountRequired)) <= 100 ? Math.ceil(100 * (item.amountRaised / item.amountRequired)) : 100} /> </div>
                                        <div className='mt-4'>
                                            <p className='text-[#71737B] text-sm font-bold'>Raised</p>
                                            <p className='mt-1 text-xl'>₹{item.amountRaised}</p>
                                        </div>
                                        <div className='relative flex mx-auto before:bg-[#dde0e0] before:content-[""] before:absolute before:h-[30%] before:w-[2px] before:left-[-12px] before:top-[26px]'>
                                            <div className='mt-5'>
                                                <p className='text-[#71737B] text-xs'>Created By</p>
                                                <p className='mt-1 text-[#53545a] text-sm'>{item.createdBy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`ml-5 mr-6 ${item.includeTaxBenefit === "true" ? "bg-[#f7f7f7]" : ""} h-[55px] text-[#2b2b35] p-2`}>
                                        {item.includeTaxBenefit === "true" &&
                                            <p className='relative before:absolute before:content-[""] before:bg-[#691a47] text-sm ml-2 before:h-[136%] before:top-[-8px] before:w-[4px] before:left-[-16px]'>Recieve Tax benefit by contributing to this cause.</p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {!searching && selected === "medical" && finaldata1 && finaldata1.slice(0, 6).map((item) => {
                        return (
                            <div key={item._id} className="cursor-pointer mx-3 mb-5 h-[530px] hover:shadow-[0_0_20px_0_rgba(156,51,83,0.3)] shadow-[0_0_30px_0_rgba(156,51,83,0.2)] w-[30%] bg-white border border-gray-200 rounded-lg relative">
                                <Link href={`/fundraiser/${item.slug}`}>
                                    {item.includeTaxBenefit === "true" &&
                                        <div className="absolute top-0 left-[-5px] px-2 py-1 bg-[#9c3353] text-white rounded-tr-lg rounded-bl-lg transform overflow-hidden">Tax Benefit</div>
                                    }

                                    <img className="w-[100%] aspect-[1.33] rounded-t-lg" src={`/coverImg/${item.fundraiserTitle}.${item.extension2}`} alt="" />
                                    <div className="px-5 mb-5 h-[50px] mt-[20px]">
                                        <h5 className="h-[50px] text-[1.3rem] font-[500] tracking-tight text-gray-500">{item.fundraiserTitle}</h5>
                                    </div>

                                    <div className='flex pl-5 h-[90px]'>
                                        <div> <CircularProgressBar percentage={Math.ceil(100 * (item.amountRaised / item.amountRequired)) <= 100 ? Math.ceil(100 * (item.amountRaised / item.amountRequired)) : 100} /> </div>
                                        <div className='mt-4'>
                                            <p className='text-[#71737B] text-sm font-bold'>Raised</p>
                                            <p className='mt-1 text-xl'>₹{item.amountRaised}</p>
                                        </div>
                                        <div className='relative flex mx-auto before:bg-[#dde0e0] before:content-[""] before:absolute before:h-[30%] before:w-[2px] before:left-[-12px] before:top-[26px]'>
                                            <div className='mt-5'>
                                                <p className='text-[#71737B] text-xs'>Created By</p>
                                                <p className='mt-1 text-[#53545a] text-sm'>{item.createdBy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`ml-5 mr-6 ${item.includeTaxBenefit === "true" ? "bg-[#f7f7f7]" : ""} h-[55px] text-[#2b2b35] p-2`}>
                                        {item.includeTaxBenefit === "true" &&
                                            <p className='relative before:absolute before:content-[""] before:bg-[#691a47] text-sm ml-2 before:h-[136%] before:top-[-8px] before:w-[4px] before:left-[-16px]'>Recieve Tax benefit by contributing to this cause.</p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {!searching && selected === "memorial" && finaldata2 && finaldata2.slice(0, 6).map((item) => {
                        return (
                            <div key={item._id} className="cursor-pointer mx-3 mb-5 h-[530px] hover:shadow-[0_0_20px_0_rgba(156,51,83,0.3)] shadow-[0_0_30px_0_rgba(156,51,83,0.2)] w-[30%] bg-white border border-gray-200 rounded-lg relative">
                                <Link href={`/fundraiser/${item.slug}`}>
                                    {item.includeTaxBenefit === "true" &&
                                        <div className="absolute top-0 left-[-5px] px-2 py-1 bg-[#9c3353] text-white rounded-tr-lg rounded-bl-lg transform overflow-hidden">Tax Benefit</div>
                                    }

                                    <img className="w-[100%] aspect-[1.33] rounded-t-lg" src={`/coverImg/${item.fundraiserTitle}.${item.extension2}`} alt="" />
                                    <div className="px-5 mb-5 h-[50px] mt-[20px]">
                                        <h5 className="h-[50px] text-[1.3rem] font-[500] tracking-tight text-gray-500">{item.fundraiserTitle}</h5>
                                    </div>

                                    <div className='flex pl-5 h-[90px]'>
                                        <div> <CircularProgressBar percentage={Math.ceil(100 * (item.amountRaised / item.amountRequired)) <= 100 ? Math.ceil(100 * (item.amountRaised / item.amountRequired)) : 100} /> </div>
                                        <div className='mt-4'>
                                            <p className='text-[#71737B] text-sm font-bold'>Raised</p>
                                            <p className='mt-1 text-xl'>₹{item.amountRaised}</p>
                                        </div>
                                        <div className='relative flex mx-auto before:bg-[#dde0e0] before:content-[""] before:absolute before:h-[30%] before:w-[2px] before:left-[-12px] before:top-[26px]'>
                                            <div className='mt-5'>
                                                <p className='text-[#71737B] text-xs'>Created By</p>
                                                <p className='mt-1 text-[#53545a] text-sm'>{item.createdBy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`ml-5 mr-6 ${item.includeTaxBenefit === "true" ? "bg-[#f7f7f7]" : ""} h-[55px] text-[#2b2b35] p-2`}>
                                        {item.includeTaxBenefit === "true" &&
                                            <p className='relative before:absolute before:content-[""] before:bg-[#691a47] text-sm ml-2 before:h-[136%] before:top-[-8px] before:w-[4px] before:left-[-16px]'>Recieve Tax benefit by contributing to this cause.</p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {!searching && selected === "non-profit" && finaldata3 && finaldata3.slice(0, 6).map((item) => {
                        return (
                            <div key={item._id} className="cursor-pointer mx-3 mb-5 h-[530px] hover:shadow-[0_0_20px_0_rgba(156,51,83,0.3)] shadow-[0_0_30px_0_rgba(156,51,83,0.2)] w-[30%] bg-white border border-gray-200 rounded-lg relative">
                                <Link href={`/fundraiser/${item.slug}`}>
                                    {item.includeTaxBenefit === "true" &&
                                        <div className="absolute top-0 left-[-5px] px-2 py-1 bg-[#9c3353] text-white rounded-tr-lg rounded-bl-lg transform overflow-hidden">Tax Benefit</div>
                                    }

                                    <img className="w-[100%] aspect-[1.33] rounded-t-lg" src={`/coverImg/${item.fundraiserTitle}.${item.extension2}`} alt="" />
                                    <div className="px-5 mb-5 h-[50px] mt-[20px]">
                                        <h5 className="h-[50px] text-[1.3rem] font-[500] tracking-tight text-gray-500">{item.fundraiserTitle}</h5>
                                    </div>

                                    <div className='flex pl-5 h-[90px]'>
                                        <div> <CircularProgressBar percentage={Math.ceil(100 * (item.amountRaised / item.amountRequired)) <= 100 ? Math.ceil(100 * (item.amountRaised / item.amountRequired)) : 100} /> </div>
                                        <div className='mt-4'>
                                            <p className='text-[#71737B] text-sm font-bold'>Raised</p>
                                            <p className='mt-1 text-xl'>₹{item.amountRaised}</p>
                                        </div>
                                        <div className='relative flex mx-auto before:bg-[#dde0e0] before:content-[""] before:absolute before:h-[30%] before:w-[2px] before:left-[-12px] before:top-[26px]'>
                                            <div className='mt-5'>
                                                <p className='text-[#71737B] text-xs'>Created By</p>
                                                <p className='mt-1 text-[#53545a] text-sm'>{item.createdBy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`ml-5 mr-6 ${item.includeTaxBenefit === "true" ? "bg-[#f7f7f7]" : ""} h-[55px] text-[#2b2b35] p-2`}>
                                        {item.includeTaxBenefit === "true" &&
                                            <p className='relative before:absolute before:content-[""] before:bg-[#691a47] text-sm ml-2 before:h-[136%] before:top-[-8px] before:w-[4px] before:left-[-16px]'>Recieve Tax benefit by contributing to this cause.</p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className='flex items-center justify-center mt-5 mb-10 underline font-bold text-[20px] text-[#9c3353]'>
                    <Link href={'/donate'} className='cursor-pointer' >
                        See more fundraisers
                    </Link>
                </div>

                {/* Request a call */}
                <div className='bg-[linear-gradient(264deg,#9c3353,#5f2747)] text-[#5d5d5d] text-[14px] leading-[1.5] font-[400] w-[100%] mb-10'>
                    <div className='rounded-[6px] bg-floral-pattern bg-no-repeat p-[29px_0]'>
                        <div className='text-center m-[0_auto] bg-[#fff] rounded-[9px] p-[18px_0] w-[85%] max-w-[1280px] '>
                            <div className='flex items-center justify-center'>
                                <p className='text-[#212121] text-[30px] mr-[15px] m-[24px_0_17px]'>Need help to setup your free fundraiser?</p>
                                <button onClick={openModal} className='h-[45px] leading-[45px] inline-block w-[250px] m-[0_2px_24px] mb-[0] text-[18px] transition-colors delay-[0.2s] ease bg-[#9c3353] text-white rounded-full shadow-[0_0_6px_0_rgba(156,51,83,.2)] hover:shadow-[0_0_8px_0_rgba(156,51,83,.4)] '>
                                    <span className='flex items-center justify-center'>
                                        <MdOutlineCall className='h-[24px] w-[24px] mr-[11px] ' size={25} />
                                        <span className='text-[20px]'>Request a call</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Us */}
                <div className='bottom-0 right-[70px] fixed z-[1000000] '>
                    <Link href={'/contactUs'} className='px-2 flex text-[18px] justify-evenly items-center text-white rounded-[5px_5px_0_0] w-[140px] h-[50px] bg-[#9c3353] shadow-[0_2px_1px_0_rgba(156,51,83,.3098)] normal-case leading-[32.4px] '>
                        <img className='py-1 w-[30px]' src="https://assets-give.milaap.org/assets/support/support-026639827351db2f76f01cb2405a636907a4b4ea56506f138364b541f9518a4d.png" alt="" />
                        <span>Contact us</span>
                    </Link>
                </div>

                {isOpen &&
                    <div className="fixed inset-0 z-10">
                        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
                        <div className="relative mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg w-[570px]">
                            <div className="flex justify-end ">
                                <AiOutlineClose className="text-2xl text-gray-600 hover:cursor-pointer focus:outline-none" onClick={closeModal} />
                            </div>
                            <div className="mt-4 mb-6">
                                <div>
                                    <div className='flex justify-center'><img className='w-[50px] inline' src="/assets/logo.png" alt="logo" /> <span className='text-[#691a47] my-3'>HopeFund</span></div>
                                    <p className='text-center text-gray-600'>Raise funds online with HopeFund</p>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <div className='text-black'>Fill your details & we will connect with you shortly</div>
                                <input value={requesterName} onChange={handleNameChange} type="text" name="requesterName" id="requesterName" className='flex-1 w-full py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='  Name' />
                                <div>
                                    <div className='border-b-2 border-gray-400'>
                                        <BsFillTelephoneFill className='text-[#000000] inline' />
                                        <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline'>
                                            <option value="0">+91</option>
                                            <option value="1">+1</option>
                                            <option value="2">+2</option>
                                        </select>
                                        <input value={requesterPhone} onChange={handlePhoneChange} type="number" name="requesterPhone" id="requesterPhone" className='flex-1 inline px-5 py-1 text-gray-600 outline-none' placeholder="Phone number" />
                                    </div>
                                    <div className='text-[12px] text-gray-500'>We will contact you on this number</div>
                                </div>

                                <div className='text-sm text-gray-700'>Why are you fundraising</div>
                                <div>
                                    <select value={requesterfundraise} onChange={handleFundraiseChange} name="requesterfundraise" className='flex-1 py-1.5 pl-2 pr-16 border-b-2 border-gray-400 text-gray-600 outline-none w-full'>
                                        {/* <option value=""></option> */}
                                        <option value="medical">Medical</option>
                                        <option value="memorial">Memorial</option>
                                        <option value="education">Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className='text-sm text-gray-700'>Prefered language</div>
                                <div>
                                    <select value={requesterlanguage} onChange={handleLanguageChange} name="requesterlanguage" className='flex-1 py-1.5 pl-2 pr-16 border-b-2 border-gray-400 text-gray-600 outline-none w-full'>
                                        <option value="english">English</option>
                                        <option value="hindi">हिन्दी</option>
                                    </select>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <button onClick={(e) => handleSubmit(e)} className='text-white text-xl py-1 px-20 rounded-3xl bg-[#691a47]' type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}

export async function getServerSideProps() {

    if (!mongoose.connections[0].readystate) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    let data = await FundraiseRequests.find({ verified: true });
    let ans = JSON.stringify(data)
    // let data1 = await FundraiseRequests.find({ verified: true, category: "medical" });
    // let data2 = await FundraiseRequests.find({ verified: true, category: "memorial" });
    // let data3 = await FundraiseRequests.find({ verified: true, category: { $in: ["others", "education"] } });
    // console.log(data);
    return {
        props: { ans }, // will be passed to the page component as props
    };
}

export default LandingPage