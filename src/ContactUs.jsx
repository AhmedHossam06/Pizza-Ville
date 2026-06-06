import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please fill in all fields',
                icon: 'error',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
            });
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:1337/api/contact-messages', {
                data: {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
            Swal.fire({
                title: 'Message Sent!',
                text: 'We will get back to you soon 🍕',
                icon: 'success',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
            });
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
            });
        }
        setLoading(false);
    }

    return (
        <div className='bg-zinc-900 min-h-screen'>
            <div className='text-center py-10 md:py-16'>
                <p className='text-[rgb(141,15,15)] uppercase tracking-widest mb-2'>Get In Touch</p>
                <h1 className='text-white text-3xl md:text-5xl font-bold'>Contact Us</h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-12 px-6 md:px-20 pb-20'>
                <div className='flex flex-col gap-8 lg:w-1/3'>
                    <div>
                        <h2 className='text-white text-2xl font-bold mb-6'>Find Us</h2>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center gap-4'>
                                <span className='text-2xl'>📍</span>
                                <div>
                                    <p className='text-white font-bold'>Address</p>
                                    <p className='text-gray-400'>123 Pizza Street, New York, NY</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='text-2xl'>📞</span>
                                <div>
                                    <p className='text-white font-bold'>Phone</p>
                                    <p className='text-gray-400'>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='text-2xl'>✉️</span>
                                <div>
                                    <p className='text-white font-bold'>Email</p>
                                    <p className='text-gray-400'>info@pizzaville.com</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='text-2xl'>🕐</span>
                                <div>
                                    <p className='text-white font-bold'>Opening Hours</p>
                                    <p className='text-gray-400'>Mon - Sun: 10:00 AM - 11:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-2xl overflow-hidden h-64'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy">
                        </iframe>
                    </div>
                </div>

                <div className='lg:w-2/3 bg-zinc-800 rounded-2xl p-8'>
                    <h2 className='text-white text-2xl font-bold mb-6'>Send Us a Message</h2>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col gap-2 flex-1'>
                                <label className='text-gray-400 text-sm'>Your Name</label>
                                <input name='name' value={formData.name} onChange={handleChange} type='text' placeholder='John Doe'
                                    className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]' />
                            </div>
                            <div className='flex flex-col gap-2 flex-1'>
                                <label className='text-gray-400 text-sm'>Your Email</label>
                                <input name='email' value={formData.email} onChange={handleChange} type='email' placeholder='john@example.com'
                                    className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-gray-400 text-sm'>Subject</label>
                            <input name='subject' value={formData.subject} onChange={handleChange} type='text' placeholder='How can we help?'
                                className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-gray-400 text-sm'>Message</label>
                            <textarea name='message' value={formData.message} onChange={handleChange} rows={6} placeholder='Write your message here...'
                                className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)] resize-none' />
                        </div>
                        <button onClick={handleSubmit} disabled={loading}
                            className='w-full py-3 rounded-xl text-white font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: loading ? 'rgb(100,100,100)' : 'rgb(141,15,15)'}}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;