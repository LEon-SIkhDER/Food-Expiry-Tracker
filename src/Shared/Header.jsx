import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';

const Header = () => {
    const location = useLocation()
    console.log(location.pathname)
    const links = <>
        <NavLink to={"/"}><li><a className='text-lg font-semibold'>Home</a></li></NavLink>
        <NavLink to={"/fridge"}><li><a className='text-lg font-semibold'>Fridge</a></li></NavLink>
    </>

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
                            className='flex gap-3 *:p-1.5 *:hover:bg-green-100 *:rounded-lg *:active:bg-green-600 *:active:text-white'
                        >
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-4">
                        <Link to={"/login"}><a className={`btn border-none ${location.pathname === "/login"&&"bg-purple-900 text-white"}`}>Login</a></Link>
                        <Link to={"/register"}><a className={`btn border-none ${location.pathname === "/register"&&"bg-purple-900 text-white"}`}>Register</a></Link>
                        
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;