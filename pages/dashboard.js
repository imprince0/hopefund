import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import User from "../models/User";
// import mongoose from "mongoose";

function Dashboard() {
    const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
    const [user, setUser] = useState({});
    let [finalDonationArray,setFinalDonationArray]=useState([{}]);

    const fetchUser = async () => {
        let email = localStorage.getItem("email");
        const response = await fetch(`${host}/api/findUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const res = await response.json();
        setUser(res.user);
        if(res.user){
            setFinalDonationArray(res.user.donationsArray)
        }
    }
    
    useEffect(() => {
        setUser({});
        fetchUser();
    }, [])

    const Router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        Router.push('/')
    }

    const handleSearch =()=>{
        Router.push('/donate')
    }

    return (
        <>

            <Navbar page={"landing"}/>
            {user &&
                <div className="grid grid-cols-6 gap-2 mt-[80px]">
                    <div className="col-span-4">
                        <div className="grid grid-cols-6 gap-2 py-10">
                            <div className="col-span-2">
                                <img src="/assets/user.png" alt="user" className="w-20 h-20 m-auto" />
                            </div>
                            <div className="col-span-4 ">
                                <div className="text-3xl text-gray-600">{user.email && (user.email).slice(0, user.email.indexOf('@'))}'s Dashboard</div>
                            </div>
                        </div>

                        <div className="mt-10 w-[750px] mx-auto">
                            <div>
                                <div className="inline-block p-2 text-lg text-gray-400 border-2 border-t-gray-500 border-x-gray-500 border-b-white">My Donations</div>
                                <div className="">
                                    <table className="w-[800px] border-collapse">
                                        <thead>
                                            <tr className="text-gray-500 border-gray-400 border-y">
                                                <th className="py-3 text-left">Projects</th>
                                                <th></th>
                                                <th></th>
                                                <th className="text-left">Date</th>
                                                <th className="text-left">Amount Donated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {finalDonationArray && finalDonationArray.map((item) => {
                                                return (
                                                    <tr key={item.fundraiser} className="border-gray-400 border-y">
                                                        <td className="py-3" >
                                                            <img className='h-[100px]' src={`/coverImg/${item.fundraiser}.${item.extension}`} alt="" />
                                                        </td>
                                                        <td className="text-[#9c3353]">{((item.fundraiser && item.fundraiser.length<30)?item.fundraiser:(item.fundraiser && item.fundraiser.slice(0,30)+`...`))}</td>
                                                        <td></td>
                                                        <td> {item.date && (item.date).slice(0,10)}</td>
                                                        <td>&#8377; {item.amount}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto h-[250px]">
                        <div className="flex-col justify-center bg-gray-200 m-2 py-3 px-10">
                            <div className="my-5 text-xl text-center text-gray-400">Total Amount Donated</div>
                            <div className="text-3xl text-center text-gray-600"> Rs {user.amountDonated}</div>
                            <button onClick={handleLogout} className="bg-[#9c3353] px-16 py-2 text-[18px] my-5  text-white rounded-3xl text-center">Logout</button>
                        </div>
                        <div onClick={handleSearch} className="cursor-pointer text-sm text-center text-red-400">Search More Fundraisers</div>
                    </div>
                </div>}
        </>
    )
}

// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readystate) {
//         await mongoose.connect(process.env.MONGO_URI);
//     }
//     let email=localStorage.getItem("email");
//     let user = await User.findOne({ email: email });

//     return {
//         props: { user: JSON.parse(JSON.stringify(user)) }, // will be passed to the page component as props
//     };
// }

export default Dashboard;