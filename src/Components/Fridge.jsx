import axios from 'axios';
import { addDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';

const Fridge = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [pageState, setPageState] = useState(1)



    useEffect(() => {
        axios.get(`http://localhost:3000/foods?skip=${(pageState - 1) * 12}`)
            .then(data => {
                console.log(data.data.result)
                setData(data.data.result)
                setTotal(data.data.total)
            })
    }, [pageState])

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
        return
    }

    const color = (isExpire) => {
        if (isExpire === "Expired") {
            return "#dc403d"
        }
        else if (isExpire === "Expire Soon") {
            // console.log("i am in holud color")
            return "#fad04e"
        }
        else {
            return "#1d8500"
        }
    }




    return (
        <div className='bg-gray-100 py-10'>
            <section>
                {/* <h1 className='text-2xl font-semibold text-center mb-10'>{pageState}</h1> */}

                <div className='grid grid-cols-4 gap-5'>
                    {data?.map((d) =>
                        <div className='p-5 border-3  rounded-lg bg-white' style={{ border: `4px solid ${color(isExpire(d.expiryDate))}` }}>
                            <Link  to={`/details/${d._id}`}>

                                <div

                                    className=' flex items-start justify-between p-2 w-full bg-center aspect-square rounded-md bg-[length:100%] hover:bg-[length:120%] duration-300 '
                                    style={{ backgroundImage: `url(${d.photoURL})` }}
                                >
                                    <h1 className='  inline-block  min-w-10 text-center rounded-full text-white font-bold' style={{ background: `${color(isExpire(d.expiryDate))}` }}>{d.quantity}</h1>
                                    <h2 className={` text-white rounded-full px-2 font-semibold`} style={{ background: `${color(isExpire(d.expiryDate))}` }}>{isExpire(d.expiryDate)}</h2>
                                </div>
                            </Link>

                            <p className='text-xs'>{d.createdAt.month}-{d.createdAt.date}-{d.createdAt.year}</p>
                            <div className='flex justify-between items-center '>
                                <h1 className='text-xl font-bold text-[#193f0e]'>{d.name}</h1>
                                <h2 className='font-semibold'>{d.category}</h2>
                            </div>
                            <Link to={`/details/${d._id}`}>
                                <button className='btn w-full mt-5 text-lg font-semibold  text-white' style={{ background: `${color(isExpire(d.expiryDate))}` }}>View Details</button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className='text-center mt-10 space-x-2'>
                    <button onClick={() => setPageState(pageState - 1)} disabled={pageState === 1} className='btn'><ChevronLeft /></button>
                    {
                        [...Array(Math.ceil(total / 12))].map((_, index) =>
                            <button className={`btn ${pageState === index + 1 && "bg-blue-500 text-white"}`} onClick={() => setPageState(index + 1)}>{index + 1}</button>

                        )
                    }
                    <button onClick={() => setPageState(pageState + 1)} disabled={pageState === Math.ceil(total / 12)} className='btn'><ChevronRight /></button>
                </div>

            </section>
        </div>
    );
};

export default Fridge;