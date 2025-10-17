import axios from 'axios';
import { addDays, format } from 'date-fns';
import { CalendarRange } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaBoxes, FaCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [modal, setModal] = useState(false)
    const [updateAbility, setUpdateAbility] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/foods/${id}`)
            .then(data => {
                console.log(data.data)
                setData(data.data)
            })
    }, [])

    // console.log(new Date(data?.expiryDate))
    const isExpire = () => {
        const expiryDate = new Date(data?.expiryDate)
        const today = new Date()
        const after5days = addDays(today, 5)
        if (expiryDate <= today) {
            return "Expired"

        }
        else if (expiryDate <= after5days) {
            const remainingDate = ((after5days - expiryDate) / 86400000)
            const remainingDays = Math.floor(remainingDate)
            // console.log(remainingDate, remainingDays)
            const remainingHours = Math.floor((remainingDate - remainingDays) * 24)
            // console.log(remainingHours)
            return `Expire in ${remainingDays}days ${remainingHours}Hours.`
        }
        else {
            return "Good"
        }




    }



    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")

    const handleUpdateAbility = (e) => {
        if (data.name === e.target.value
            || data.photoURL === e.target.value
            || data.category === e.target.value
            || data.quantity == e.target.value
            || data.description === e.target.value) {
            setUpdateAbility(false) // button  disable
            // console.log("name is working")
        }
        else {
            setUpdateAbility(true)
            // console.log("else is working")
        }

    }


    const handleUpdate = (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        const form = e.target
        const formData = new FormData(form)
        const formValues = Object.fromEntries(formData.entries())
        // console.log(formValues)

        axios.put(`http://localhost:3000/foods/${id}`, formValues)
            .then(result => {
                // console.log(data.data)
                if (result.data.modifiedCount) {
                    toast.success("Updated Successfully")
                    setUpdateLoading(false)
                    setModal(false)
                    setData({ ...data, ...formValues })
                    console.log(data)

                }
            })


    }

    const handleDelete = () => {
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
                    .then(data => {
                        console.log(data.data)
                        if (data.data.deletedCount) {
                            console.log("deleted")
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/fridge")
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
        <div className='bg-gray-100 py-10'>
            <ToastContainer />
            {data &&
                <section>
                    <h1 className='pl-5 text-4xl font-semibold  font-[Rancho] text-[#193f0e] '>{data.name}.</h1>
                    <h2 className='pl-5 text-sm mb-2'>Created At: {data.createdAt.date}th {data.createdAt.month} {data.createdAt.year}</h2>
                    <div className='flex gap-10'>
                        <div className='relative'>
                            <img className='rounded-xl' src={data.photoURL} alt="" />
                        </div>
                        <div className='flex flex-col flex-1 py-2'>
                            <h1 className='text-4xl font-semibold font-[Playfair]'>{data.name}</h1>
                            <p>{data.description}</p>

                            <div className='grid grid-cols-2 mt-2 gap-5'>

                                <div className='flex items-start gap-2'>
                                    <MdCategory className='text-2xl mt-1 text-green-700' />
                                    <div>
                                        <h1 className='text-3xl font-semibold font-[Playfair]'>Category</h1>
                                        <h1 className='text-lg'>{data.category}</h1>
                                    </div>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <FaCircle className='text-2xl mt-1 text-green-700' />
                                    <div>
                                        <h1 className='text-3xl font-semibold font-[Playfair]'>Status</h1>
                                        <h1 className='text-lg'>{isExpire()}</h1>
                                    </div>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <FaBoxes className='text-2xl mt-1 text-green-700' />
                                    <div>
                                        <h1 className='text-3xl font-semibold font-[Playfair]'>Quantity</h1>
                                        <h1 className='text-lg '>{data.quantity}</h1>
                                    </div>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <CalendarRange className='text-2xl mt-1 text-green-700' />
                                    <div>
                                        <h1 className='text-3xl font-semibold font-[Playfair]'>Expiry Date</h1>
                                        <h1 className='text-lg'>{data.expiryDate}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='flex-1 '></div>
                            <div className='flex justify-between'>
                                <button onClick={handleDelete} className='btn bg-red-500 text-white hover:bg-red-600'><FaTrashAlt />Delete</button>
                                <button onClick={() => setModal(!modal)} className='btn bg-blue-800 text-white hover:bg-blue-900 '><FaEdit />Update</button>
                            </div>
                        </div>

                    </div>
                    {modal && (
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] duration-300  flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg relative">
                                <div className='flex justify-between items-start'>
                                    <h2 className="text-2xl font-semibold mb-4">Update Food</h2>
                                    <button onClick={() => setModal(false)} className='relative top-[-15px] right-[-10px] rounded  cursor-pointer h-8 w-8 bg-gray-100 border border-gray-200 active:scale-95 hover:bg-gray-200'>X</button>

                                </div>

                                <form onSubmit={handleUpdate} >
                                    {/* name  */}
                                    <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 rounded-t-lg'>
                                        <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Title</label>
                                        <input
                                            className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  '
                                            type="text"
                                            placeholder='Food Name'
                                            name='name'
                                            defaultValue={data.name}
                                            onChange={handleUpdateAbility} />
                                    </fieldset>
                                    {/* photoURL */}
                                    <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2'>
                                        <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Photo Url</label>
                                        <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="url" placeholder='https://' name='photoURL' defaultValue={data.photoURL} onChange={handleUpdateAbility} />
                                    </fieldset>
                                    {/* category */}
                                    <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2'>
                                        <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Category </label>
                                        <select defaultValue={data.category} name='Category' className="select border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base" onChange={handleUpdateAbility}>
                                            <option disabled={true}>Category</option>
                                            <option value={"Dairy"}>Dairy</option>
                                            <option value={"Meat"}>Meat</option>
                                            <option value={"Vegetables"}>Vegetables</option>
                                            <option value={"Snacks"}>Snacks</option>
                                        </select>
                                    </fieldset>


                                    <div className='flex '>
                                        {/* expiry date  */}
                                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 w-full'>
                                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Expiry Date</label>
                                            <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="date" name='expiryDate' defaultValue={data.expiryDate} min={tomorrow} onChange={handleUpdateAbility} />
                                        </fieldset>


                                        {/* quantity */}

                                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 w-2/5'>
                                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Quantity </label>
                                            <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="number" placeholder='Quantity' name='quantity' defaultValue={data.quantity} onChange={handleUpdateAbility} />
                                        </fieldset>

                                    </div>

                                    {/* description  */}
                                    <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 rounded-b-lg'>
                                        <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Description</label>
                                        <textarea className=' textarea border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="text" placeholder='Description' name='description' defaultValue={data.description} onChange={handleUpdateAbility} />
                                    </fieldset>

                                    <button disabled={!updateAbility} className='btn w-full mt-3 bg-[#016630] text-white text-lg'>{updateLoading ? <span className="loading loading-spinner loading-md"></span> : "Update Food"}</button>
                                </form>
                            </div>
                        </div>
                    )}


                </section>
            }
        </div>
    );
};




export default Details;