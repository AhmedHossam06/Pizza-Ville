import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        if (!formData.username || !formData.email || !formData.password) {
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

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const exists = users.find(u => u.email === formData.email);

        if (exists) {
            Swal.fire({
                title: 'Error!',
                text: 'Email already exists',
                icon: 'error',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
            });
            setLoading(false);
            return;
        }

        const newUser = { username: formData.username, email: formData.email, password: formData.password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        login(newUser, null);
        Swal.fire({
            title: 'Welcome to Pizza Ville! 🍕',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#18181b',
            color: '#ffffff',
        });
        navigate('/');
        setLoading(false);
    }

    return (
        <div className='bg-zinc-900 min-h-screen flex items-center justify-center px-6'>
            <div className='bg-zinc-800 rounded-2xl p-8 w-full max-w-md'>
                <h1 className='text-white text-3xl font-bold text-center mb-2'>Create Account</h1>
                <p className='text-gray-400 text-center mb-8'>Join Pizza Ville today</p>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 text-sm'>Username</label>
                        <input
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            type='text'
                            placeholder='johndoe'
                            className='bg-zinc-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(141,15,15)]'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 text-sm'>Email</label>
                        <input
                            name='email'
                            value={formData.email}
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
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    <p className='text-gray-400 text-center text-sm'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-[rgb(141,15,15)] hover:opacity-80'>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;