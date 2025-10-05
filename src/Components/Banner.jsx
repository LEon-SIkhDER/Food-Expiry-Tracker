import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div>
            <section>
                <div className='bg-[url(/banner.png)]  bg-no-repeat w-full bg-cover p-10 rounded-2xl offset'>
                    <div className='w-2/3 space-y-5 py-52'>
                        <h1 className='text-5xl font-semibold text-white text-shadow-2xs'>HarvestGuard: Reduce Food Waste, Stay Fresh</h1>
                        <h2 className='text-white text-2xl'>Track Smarter, Waste Less: Your Food, Your Way</h2>
                        <Link to={'/fridge'}><button className='btn rounded-full bg-green-800 border-none text-white shadow-none'>View All Foods</button></Link>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;