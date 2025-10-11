import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { addDays, format } from 'date-fns';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddFood = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const tomorrow = addDays(new Date(), 1)


    const present = format(tomorrow, "yyyy-MM-dd")



    console.log(present)


    const handleForm = (e) => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formValue = Object.fromEntries(formData.entries())

        const time = format(new Date(), "p")
        const date = format(new Date(), "dd")
        const month = format(new Date(), "MMMM")
        const year = format(new Date(), "yyyy")
        const createdAt = { time, date, month, year }









        formValue.userEmail = user.email
        formValue.createdAt = createdAt
        console.log(formValue)
        axios.post("http://localhost:3000/foods", formValue)
            .then(result => {
                console.log(result)
                setLoading(false)
                toast.success("Food Add successfully")

            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                toast.error("Something went wrong")

            })














    }

    return (
        <div className='bg-gray-100 py-14'>
            <ToastContainer />
            <section>
                <div className='p-6  rounded-lg mx-auto  shadow bg-white max-w-[500px] ' >
                    <form onSubmit={handleForm}>
                        {/* name  */}
                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 rounded-t-lg'>
                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Title</label>
                            <input
                                className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  '
                                type="text"
                                placeholder='Food Name'
                                name='name' />
                        </fieldset>
                        {/* photoURL */}
                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2'>
                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Photo Url</label>
                            <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="url"  placeholder='https://' name='photoURL' />
                        </fieldset>
                        {/* category */}
                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2'>
                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Category </label>
                            <select defaultValue="Category" name='Category' className="select border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base">
                                <option disabled={true}>Category</option>
                                <option value={"Dairy"}>Dairy</option>
                                <option value={"Meat"}>Meat</option>
                                <option value={"Vegetables"}>Vegetables</option>
                                <option value={"Snacks"}>Snacks</option>
                            </select>
                        </fieldset>



                        <div className='flex '>
                            <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 w-full'>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Expiry Date</label>
                                <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="date" min={present} name='expiryDate' />
                            </fieldset>




                            <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 w-2/5'>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Quantity </label>
                                <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="number" placeholder='Quantity' name='quantity' />
                            </fieldset>

                        </div>


                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 rounded-b-lg'>
                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Description</label>
                            <textarea className=' textarea border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="text" placeholder='Description' name='description' />
                        </fieldset>

                        <button className='btn w-full mt-3 bg-[#016630] text-white text-lg'>{loading ? <span className="loading loading-spinner loading-md"></span> : "Add Food"}</button>
                    </form>

                </div>


            </section>
        </div>
    );
};

export default AddFood;