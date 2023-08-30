import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link';
import CircularProgressBar from '../components/CircularProgressBar';
const Donate = () => {
    const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const [data, setData] = useState({});
    useEffect(() => {
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
                setData(JSON.parse(JSON.stringify(json)));
            }
        }
        fetchData();
    }, [])
    let finalData=data.data;
    return (
        <>
            <Navbar subpage={"donate"} />
            <div className='mt-24 relative flex flex-wrap mx-[130px] justify-center'>
                {finalData && finalData.map((item) => {
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
        </>
    )
}

export default Donate