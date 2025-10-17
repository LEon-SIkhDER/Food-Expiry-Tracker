import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { addDays } from 'date-fns';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Eye, SquarePen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const MyItems = () => {
    const { user } = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [total, setTotal] = useState(null)
    const [pageState, setPageState] = useState(1)
    const [loading, setLoading] = useState(true)
    const limit = 12

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        axios.get(`http://localhost:3000/foods?email=${user.email}&skip=${(pageState - 1) * limit}&limit=${limit}`)
            .then(data => {
                setData(data.data.result)
                console.log(data.data.result)
                setTotal(data.data.total)
                setLoading(false) 


            })
    }, [pageState])

    // if (loading) {
    //     return (
    //         <div className='bg-gray-100 py-10'>
    //             <section>
    //                 <div className='grid grid-cols-4 gap-5'>
    //                     {
    //                         [...Array(limit)].map((_, index) =>
    //                             <div className='w-full max-w-[325px] min-h-[429px] h-auto  rounded-lg p-5 flex flex-col  border-3 border-gray-200' key={index}>
    //                                 <div className='w-full bg-gray-200 flex-1 rounded animate-shimmer'></div>
    //                                 <div className='flex mt-4 items-center justify-between'>
    //                                     <h1 className='bg-gray-200 h-5 w-1/2 rounded  animate-shimmer'></h1>
    //                                     <h2 className='bg-gray-200 h-4 w-1/3 rounded animate-shimmer'></h2>
    //                                 </div>
    //                                 <button className='h-10 w-full bg-gray-200 mt-5 animate-shimmer'></button>
    //                             </div>
    //                         )
    //                     }
    //                 </div>
    //             </section>
    //         </div>
    //     )
    // }

    const isExpire = (expire) => {
        const today = new Date()
        const after5Days = addDays(today, 5)
        const expireDate = new Date(expire)
        if (expireDate <= today) {
            return "Expired"
        }
        else if (expireDate <= after5Days) {
            return "Expire Soon"
        }
        else {
            return "Good"
        }
    }

    const color = (isExpire) => {
        if (isExpire === "Expired") {
            // red 
            return "#dc403d"
        }
        else if (isExpire === "Expire Soon") {
            // console.log("i am in holud color")
            // yellow  
            return "#fad04e"


        }
        else {
            // green 
            return "#1d8500"
        }
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1d8500",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/foods/${id}`)
                    .then(data2 => {
                        console.log(data2.data)
                        if (data2.data.deletedCount) {
                            console.log("deleted")
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setData(data.filter((d) => d._id !== id))
                                }
                            })
                        }

                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            confirmButtonColor: "#1d8500",

                        });
                    })



            }
        });
    }





    return (
        <div className='bg-gray-50 py-10'>
            <section>
                {/* <h1 className='text-2xl font-semibold text-center mb-10'>{pageState}</h1> */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <h1>S/N</h1>
                                </th>
                                <th>Name</th>
                                <th>Expiry Date(Y_M_D)</th>
                                <th>Status</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}



                            {loading ?
                                [...Array(limit)].map((_, index) =>
                                    <tr key={index}>
                                        <th>
                                            {/* <h1>{(pageState - 1) * limit + 1 + index}</h1> */}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <div className='w-12 h-12 animate-shimmer '></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold animate-shimmer w-24 h-5 animate-shimmer rounded"></div>
                                                    <div className="text-sm opacity-50 h-4 w-12 animate-shimmer rounded mt-1"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><div className='font-semibold w-24 h-4 animate-shimmer rounded'></div></td>
                                        <td>
                                            <h2 className='h-4 w-20 animate-shimmer rounded'></h2>
                                        </td>
                                        <th className='space-x-1'>
                                            <button className="btn btn-circle animate-shimmer"></button>
                                            <button className="btn btn-circle animate-shimmer"></button>
                                            <button  className="btn  btn-circle animate-shimmer"></button>
                                        </th>
                                    </tr>
                                )
                                : data.map((d, index) => <tr>
                                    <th>
                                        <h1>{(pageState - 1) * limit + 1 + index}</h1>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={d.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{d.name}</div>
                                                <div className="text-sm opacity-50">{d.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-semibold'>{d.expiryDate}</td>
                                    <td>
                                        <h2 className={`font-semibold text-shadow-2xs text-shadow-white`} style={{ color: `${color(isExpire(d.expiryDate))}` }}>{isExpire(d.expiryDate)}</h2>
                                    </td>
                                    <th className='space-x-1'>
                                        <Link to={`/details/${d._id}`}>
                                            <button className="btn btn-circle btn-info text-white"><Eye size={18} /></button>
                                        </Link>
                                        <button className="btn btn-circle btn-success text-white"><SquarePen size={18} /></button>
                                        <button onClick={() => handleDelete(d._id)} className="btn  btn-circle btn-error text-white"><Trash2 size={18} /></button>
                                    </th>
                                </tr>)}












                        </tbody>
                    </table>
                </div>
                <div className='grid grid-cols-4 gap-5'>


                </div>

                {/* <div className='text-center mt-10 space-x-2'>
                    <button onClick={() => setPageState(pageState - 1)} disabled={pageState === 1} className='btn'><ChevronLeft /></button>
                    {
                        [...Array(Math.ceil(total / 12))].map((_, index) =>
                            <button className={`btn ${pageState === index + 1 && "bg-blue-500 text-white"}`} onClick={() => setPageState(index + 1)} key={index}>{index + 1}</button>

                        )
                    }
                    <button onClick={() => setPageState(pageState + 1)} disabled={pageState === Math.ceil(total / 12)} className='btn'><ChevronRight /></button>
                </div> */}

                {total > 12 && <div className='mt-10 text-center space-x-2'>
                    <button onClick={() => setPageState(pageState - 1)} disabled={pageState === 1} className='btn'><ChevronLeft /></button>
                    {
                        [...Array(Math.ceil(total / limit))].map((_, index) =>
                            <button onClick={() => setPageState(index + 1)} className={`btn ${pageState === index + 1 && "bg-blue-500 text-white"}`}>{index + 1}</button>
                        )
                    }
                    <button onClick={() => setPageState(pageState + 1)} disabled={pageState === Math.ceil(total / 12)} className='btn'><ChevronRight /></button>
                </div>}


            </section>
        </div>
    );
};

export default MyItems;