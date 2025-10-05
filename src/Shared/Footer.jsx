import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className='bg-[url(./footer.png)]  bg-cover w-full pb-5 pt-40 mt-10'>
            <section>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2 mt-[-9px]'>
                        <img className='max-w-12' src="/logo.png" alt="" />
                        <a className="text-2xl font-semibold text-[#193f0e]">HarvestGuard</a>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold text-[#193f0e] mb-4'>Get In Touch</h1>
                        <div className='text-[#193f0e]'>
                            <p>Dhanmondi, Dhaka 1209, Bangladesh</p>
                            <a href='tel:+8801645567296' className='block'>tel:+880 1645-567292</a>
                            <a href='mailto:leonsikhder@gmail.com' className='block'>Email:leonsikhder@gmail.com</a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold text-[#193f0e] mb-4'>Quick Links </h1>
                        <div className='text-[#193f0e]'>
                            <Link to={"/"}><li className='text-lg font-semibold list-none'>Home</li></Link>
                            <Link to={"/fridge"}><li className='text-lg font-semibold list-none'>Fridge</li></Link>
                            <Link to={"/add-food"}><li className='text-lg font-semibold list-none'>Add Food</li></Link>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <div className='mx-auto'> */}
                    <div className='pl-24'>
                        <h1 className='text-2xl font-semibold text-[#193f0e] mb-4'>Follow Us On</h1>
                        <div className='flex gap-5'>
                            <a href="https://www.facebook.com/leon.sikdar#" target='_black'><FaFacebook color='#193f0e' size={45} /></a>
                            <FaLinkedin color='#193f0e' size={45} />
                            <FaSquareXTwitter color='#193f0e' size={45} />
                            <FaYoutube color='#193f0e' size={45} />
                        </div>
                    </div>

                </div>
                <div className='border-b border-green-950 mt-10 mb-3'></div>
                <p className='text-center '>Harvest Guard offers smart food tracking solutions to help you reduce waste and manage your kitchen efficiently.</p>
                <p className='text-center '>© 2025 RannaGhor. All rights reserved & Designed by <span className='font-[mr_dafoe] sm:inline-block block'>Leon Sikhder.</span></p>








            </section>
        </div>
    );
};

export default Footer;