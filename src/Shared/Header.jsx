import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import AuthContext from '../Context/AuthContext';
import { MdLogout } from 'react-icons/md';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { auth } from '../../firebase.config';
import { Tooltip } from 'react-tooltip'

import { signOut } from "firebase/auth"
import { useRef } from 'react';
import { useEffect } from 'react';
const Header = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const dropdownRef = useRef()

    const [dropdown, setDropdown] = useState(false)
    // console.log(dropdown)


    const links = <>
        <NavLink to={"/"}><li className='text-lg font-semibold'>Home</li></NavLink>
        <NavLink to={"/fridge"}><li className='text-lg font-semibold'>Fridge</li></NavLink>
        <NavLink to={"/add-food"}><li className='text-lg font-semibold'>Add Food</li></NavLink>
        <NavLink to={"/my-items"}><li className='text-lg font-semibold'>My Items</li></NavLink>
    </>
    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to log out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#59067d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I do!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(result => {
                        console.log(result)
                        Swal.fire({
                            title: "Logged Out!",
                            text: "Logged Out Successfully.",
                            confirmButtonColor: "#59067d",
                            icon: "success"
                        });
                        localStorage.removeItem("user")

                    })
                    .catch((error) => console.log(error))

            }
        });


    }

    useEffect(() => {
        const handleClick = (e) => {
            // console.log("function is running")
            if (!dropdownRef.current.contains(e.target)) {
                setDropdown(false)
            }
        }
        document.addEventListener("click", handleClick)

        return () => document.removeEventListener("click", handleClick)
    }, [])



















    return (
        <div>
            <section>
                <div className="navbar bg-base-100 ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                {links}
                            </ul>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img className='max-w-12' src="/logo.png" alt="" />
                            <a className="text-2xl font-semibold">HarvestGuard</a>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul
                            // className="menu menu-horizontal px-1"
                            className='flex gap-3 *:p-1.5 *:hover:bg-green-100 *:rounded-lg *:active:bg-green-600 '
                        >
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-4">
                        {user ?
                            <div className='p-1  duration-100 z-10  rounded-full relative hover:bg-black/10' ref={dropdownRef}>
                                <Tooltip id="my-tooltip" />
                                <img
                                    onClick={() => setDropdown(!dropdown)}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={user?.displayName}
                                    className='w-10 rounded-full  active:scale-95' src={user?.photoURL} alt="Img" />
                                <div className={`${dropdown ? "block" : "hidden"} absolute top-full w-max right-0 bg-white p-3 border border-gray-200 text-center rounded `}>
                                    <img className='w-20 rounded-full mx-auto' src={user.photoURL} alt="Img" />
                                    <h1 className='font-semibold text-xl mb-2'>{user.displayName}</h1>
                                    <h2>{user.email}</h2>
                                    <div className='border-b border-gray-300 mb-1'></div>
                                    <button onClick={handleSignOut} className='text-left font-semibold flex items-center gap-1 hover:bg-gray-200 cursor-pointer btn rounded text-red-500 w-full text-base'>LogOut<span><MdLogout size={20} className='rotate-180 mt-[2px]' /></span></button>
                                </div>
                            </div> :
                            <>
                                <Link to={"/login"}><button className={`btn border-none ${location.pathname === "/login" && "bg-purple-900 text-white"}`}>Login</button></Link>
                                
                                <Link to={"/register"}><button className={`btn border-none ${location.pathname === "/register" && "bg-purple-900 text-white"}`}>Register</button></Link>
                            </>
                        }



                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;