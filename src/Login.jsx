import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

function Login() {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        if (!formData.identifier || !formData.password) {
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
            const res = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: formData.identifier,
                password: formData.password,
            });
            login(res.data.user, res.data.jwt);
            Swal.fire({
                title: 'Welcome back! 🍕',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#18181b',
                color: '#ffffff',
            });
            navigate('/');
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid email or password',
                icon: 'error',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
            });
        }
        setLoading(false);
    }

    return (
        <div className='bg-zinc-900 min-h-screen flex items-center justify-center px-6'>
            <div className='bg-zinc-800 rounded-2xl p-8 w-full max-w-md'>
                <h1 className='text-white text-3xl font-bold text-center mb-2'>Welcome Back</h1>
                <p className='text-gray-400 text-center mb-8'>Sign in to your account</p>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 text-sm'>Email</label>
                        <input
                            name='identifier'
                            value={formData.identifier}
                            onChange={handleChange}
                            type='email'
                            placeholder='john@example.com'
                            className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 text-sm'>Password</label>
                        <input
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            type='password'
                            placeholder='••••••••'
                            className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]'
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className='w-full py-3 rounded-xl text-white font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1 mt-2'
                        style={{ backgroundColor: loading ? 'rgb(100,100,100)' : 'rgb(141,15,15)' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <p className='text-gray-400 text-center text-sm'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-[rgb(141,15,15)] hover:opacity-80'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;