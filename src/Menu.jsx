import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

function Menu({ addToCart }) {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:1337/api/pizzas?populate=*')
            .then(res => res.json())
            .then(data => {
                setPizzas(data.data);
                setLoading(false);
            });
    }, []);

    function handleAddToCart(pizza) {
        if (!user) {
            Swal.fire({
                title: 'Please Login First!',
                text: 'You need an account to add items to cart',
                icon: 'warning',
                background: '#18181b',
                color: '#ffffff',
                confirmButtonColor: 'rgb(141,15,15)',
                confirmButtonText: 'Go to Login',
            }).then((result) => {
                if (result.isConfirmed) navigate('/login');
            });
            return;
        }
        addToCart(pizza);
        Swal.fire({
            title: 'Added to your cart',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: '#18181b',
            color: '#ffffff',
        });
    }

    if (loading) return (
        <div className='bg-zinc-900 min-h-screen flex items-center justify-center'>
            <p className='text-white text-2xl'>Loading...</p>
        </div>
    );

    return (
        <div className='bg-zinc-900 min-h-screen px-6 md:px-20 py-10'>
            <h1 className='text-white text-3xl md:text-4xl font-bold text-center mb-10'>Italy Pizza Menu</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {pizzas.map(pizza => (
                    <div key={pizza.id} className='bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
                        <img 
                            src={`http://localhost:1337${pizza.img[0].url}`} 
                            className='w-full h-48 object-cover' 
                            alt={pizza.name} 
                        />
                        <div className='p-4 flex flex-col gap-2 flex-1'>
                            <h2 className='text-lg font-bold'>{pizza.name}</h2>
                            <p className='text-gray-500 text-sm flex-1'>{pizza.desc}</p>
                            <p className='text-right font-bold'>{pizza.price}EGP</p>
                            <button
                                onClick={() => handleAddToCart(pizza)}
                                className='w-full py-2 rounded-xl font-bold cursor-pointer border-2 transition-all duration-300 hover:-translate-y-1'
                                style={{backgroundColor: 'black', color: 'white'}}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgb(141,15,15)'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'black'; }}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;