import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { format } from 'date-fns';
import axios from 'axios';

const AddFood = () => {



    const { user } = useContext(AuthContext)
    const [category, setCategory] = useState([])
    const handleCheckbox = (e) => {
        const value = e.target.value
        // console.log(value)
        const checked = e.target.checked
        // console.log(checked)
        if (checked) {
            setCategory([...category, value])
        }
        else {
            const filteredValue = category.filter((c) => c !== value)
            setCategory(filteredValue)
        }
    }
    const handleForm = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formValue = Object.fromEntries(formData.entries())

        const time = format(new Date(), "p")
        const date = format(new Date(), "dd")
        const month = format(new Date(), "MMMM")
        const year = format(new Date(), "yyyy")
        const createdAt = { time, date, month, year }







        formValue.category = category
        formValue.userEmail = user.email
        formValue.createdAt = createdAt
        console.log(formValue)
        axios.post("http://localhost:3000/foods", formValue)
        .then(result=>{
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
        })

        












    }

    return (
        <div className='bg-gray-100 py-14'>
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
                            <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="url" defaultValue="https://" placeholder='Url of your photo' name='photoURL' />
                        </fieldset>
                        {/* category */}
                        <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2'>
                            <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Category </label>
                            <div className='flex justify-between shadow py-2 pr-2'>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>
                                    <input onChange={handleCheckbox} className='checkbox bg-white checked:bg-white' type="checkbox" placeholder='Food Name' value={"Dairy"} /> Dairy
                                </label>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>
                                    <input onChange={handleCheckbox} className='checkbox bg-white checked:bg-white' type="checkbox" placeholder='Food Name' value={"Meat"} /> Meat
                                </label>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>
                                    <input onChange={handleCheckbox} className='checkbox bg-white checked:bg-white' type="checkbox" placeholder='Food Name' value={'Vegetable'} /> Vegetables
                                </label>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>
                                    <input onChange={handleCheckbox} className='checkbox bg-white checked:bg-white' type="checkbox" placeholder='Food Name' value={"Snacks"} /> Snacks
                                </label>
                            </div>
                        </fieldset>



                        <div className='flex '>
                            <fieldset className='fieldset bg-green-200  p-4 border-green-300 border-2 w-full'>
                                <label className='ml-2 text-[#193f0e] font-semibold text-sm'>Expiry Date</label>
                                <input className='input border-none shadow-none focus:outline-green-400 focus:shadow-none bg-white w-full text-base  ' type="date" name='expiryDate' />
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

                        <button className='btn w-full mt-3 bg-[#016630] text-white text-lg'>Add Food</button>
                    </form>

                </div>


            </section>
        </div>
    );
};

export default AddFood;