import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='bg-black text-white'>
            
            {/* Main Footer */}
            <div className='px-8 md:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                
                {/* Logo & Description */}
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-bold'>PIZZA VILLE</h2>
                    <p className='text-gray-400 text-sm leading-relaxed'>
                        Authentic Neapolitan pizza baked hot and fast in a brick oven. 
                        A recipe handed down through five generations.
                    </p>
                    {/* Social Media */}
                    <div className='flex gap-4 mt-2'>
                        <a href='#' className='w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[rgb(141,15,15)] transition-all duration-300'>f</a>
                        <a href='#' className='w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[rgb(141,15,15)] transition-all duration-300'>in</a>
                        <a href='#' className='w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[rgb(141,15,15)] transition-all duration-300'>X</a>
                        <a href='#' className='w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[rgb(141,15,15)] transition-all duration-300'>ig</a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-bold'>Quick Links</h3>
                    <div className='flex flex-col gap-2'>
                        <Link to='/' className='text-gray-400 hover:text-[rgb(141,15,15)] transition-all duration-300 text-sm'>Home</Link>
                        <Link to='/menu' className='text-gray-400 hover:text-[rgb(141,15,15)] transition-all duration-300 text-sm'>Menu</Link>
                        <Link to='/cart' className='text-gray-400 hover:text-[rgb(141,15,15)] transition-all duration-300 text-sm'>Cart</Link>
                        <Link to='/contact_us' className='text-gray-400 hover:text-[rgb(141,15,15)] transition-all duration-300 text-sm'>Contact Us</Link>
                    </div>
                </div>

                {/* Contact Info */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-bold'>Contact Us</h3>
                    <div className='flex flex-col gap-3'>
                        <p className='text-gray-400 text-sm flex items-center gap-2'>📍 123 Pizza Street, New York, NY</p>
                        <p className='text-gray-400 text-sm flex items-center gap-2'>📞 +1 (555) 123-4567</p>
                        <p className='text-gray-400 text-sm flex items-center gap-2'>✉️ info@pizzaville.com</p>
                        <p className='text-gray-400 text-sm flex items-center gap-2'>🕐 Mon - Sun: 10AM - 11PM</p>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-bold'>Opening Hours</h3>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-400'>Monday - Friday</span>
                            <span className='text-white'>10AM - 11PM</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-400'>Saturday</span>
                            <span className='text-white'>10AM - 12AM</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-400'>Sunday</span>
                            <span className='text-white'>12PM - 10PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-zinc-800 px-8 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4'>
                <p className='text-gray-400 text-sm'>© 2025 Pizza Ville. All rights reserved.</p>
                <div className='flex gap-6'>
                    <a href='#' className='text-gray-400 hover:text-white text-sm transition-all duration-300'>Privacy Policy</a>
                    <a href='#' className='text-gray-400 hover:text-white text-sm transition-all duration-300'>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;