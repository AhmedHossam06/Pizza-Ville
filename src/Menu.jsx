import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { gsap } from 'gsap';
import Swal from 'sweetalert2';
import cheeseImg from './assets/cheese-pizza.jpg';
import deliciousImg from './assets/delicious.jpg';
import margheritaImg from './assets/margherita.jpg';
import pepperoniImg from './assets/pepperoni-pizza.jpg';
import rusticaImg from './assets/rustica.jpg';
import spicyImg from './assets/spicy_pep.jpg';
import tomatoImg from './assets/tomato.jpg';
import vegetarianImg from './assets/vegetarian-pizza.jpg';
import veggieImg from './assets/Veggie Delight.jpg';

const pizzas = [
    { id: 1, name: 'Cheese Pizza', desc: 'Get our Manhattan Classic Cheese Pizza with your choice of sauce and crust.', price: 110, img: cheeseImg, rating: 4.5 },
    { id: 2, name: 'Pepperoni Pizza', desc: 'Get our classic Pepperoni pizza with your choice of sauce and crust.', price: 150, img: pepperoniImg, rating: 4.8 },
    { id: 3, name: 'Vegetarian Pizza', desc: 'Tomato Sauce, Mozzarella, Green Pepper, Onions, Fresh Mushrooms, Tomatoes, and Black Olives.', price: 100, img: vegetarianImg, rating: 4.2 },
    { id: 4, name: 'Rustica Pizza', desc: 'Tomato sauce, mozzarella, sausage, crispy bacon, roasted red peppers, and black olives.', price: 170, img: rusticaImg, rating: 4.6 },
    { id: 5, name: 'Delicious Pizza', desc: 'A mix of Porcini Mushrooms, Truffle Paste, Mozzarella, Fresh Mushrooms, Caramelized Onions.', price: 200, img: deliciousImg, rating: 4.9 },
    { id: 6, name: 'Tomato Pizza', desc: 'The Classic Marinara Sauce, Roma Tomatoes, Fresh Mozzarella, Basil, and Olive Oil drizzle.', price: 130, img: tomatoImg, rating: 4.3 },
    { id: 7, name: 'Margherita Classic', desc: 'A timeless favorite topped with fresh tomato sauce, creamy mozzarella, and fragrant basil leaves.', price: 125, img: margheritaImg, rating: 4.7 },
    { id: 8, name: 'Spicy Pepperoni Inferno', desc: 'Loaded with zesty pepperoni slices, melted cheese, and a hint of chili flakes for a fiery kick.', price: 180, img: spicyImg, rating: 4.8 },
    { id: 9, name: 'Veggie Delight', desc: 'A colorful mix of bell peppers, mushrooms, olives, red onions, and tomatoes, finished with a drizzle of olive oil and fresh herbs.', price: 100, img: veggieImg, rating: 4.4 },
];

function Stars({ rating }) {
    return (
        <div className='flex gap-1 items-center'>
            {[1, 2, 3, 4, 5].map(star => (
                <span key={star} style={{ color: star <= Math.round(rating) ? 'rgb(141,15,15)' : '#555', fontSize: 20 }}>★</span>
            ))}
            <span className='text-gray-400 text-sm ml-1'>({rating})</span>
        </div>
    );
}

function Menu({ addToCart }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [pendingRect, setPendingRect] = useState(null);
    const imgRefs = useRef({});
    const activeImgRef = useRef(null);
    const detailContentRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);

    // Cards entrance animation
    useEffect(() => {
        gsap.set(cardsRef.current, { opacity: 0, y: 50 });
        gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2,
        });
    }, []);

    // Detail animation
    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (selectedPizza && activeImgRef.current && pendingRect && !isMobile) {
            gsap.fromTo(activeImgRef.current,
                {
                    top: pendingRect.top,
                    left: pendingRect.left,
                    width: pendingRect.width,
                    height: pendingRect.height,
                    borderRadius: '0px',
                    rotation: 0,
                    opacity: 1,
                },
                {
                    top: '50%',
                    left: '65%',
                    xPercent: -50,
                    yPercent: -50,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    rotation: 360,
                    duration: 0.9,
                    ease: 'power3.inOut',
                }
            );
        }

        if (selectedPizza && detailContentRef.current) {
            gsap.fromTo(detailContentRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: isMobile ? 0.1 : 0.4 }
            );
        }
    }, [selectedPizza]);

    function openDetail(pizza) {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            setSelectedPizza(pizza);
            setIsOpen(true);
            gsap.to(gridRef.current, { opacity: 0, duration: 0.3 });
            return;
        }

        const gridImg = imgRefs.current[pizza.id];
        const rect = gridImg.getBoundingClientRect();
        setPendingRect(rect);
        setSelectedPizza(pizza);
        setIsOpen(true);
        gsap.to(gridRef.current, { opacity: 0, duration: 0.3 });
    }

    function closeDetail() {
        if (activeImgRef.current) {
            gsap.to(activeImgRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
        }
        gsap.to(detailContentRef.current, { opacity: 0, x: -50, duration: 0.3 });
        gsap.to(gridRef.current, {
            opacity: 1, duration: 0.4, delay: 0.2,
            onComplete: () => {
                setSelectedPizza(null);
                setIsOpen(false);
                setPendingRect(null);
            }
        });
    }

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
        closeDetail();
        Swal.fire({
            title: 'Added to your cart 🍕',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: '#18181b',
            color: '#ffffff',
        });
    }

    return (
        <div className='bg-zinc-900 min-h-screen'>

            {/* Active Image - desktop only */}
            {selectedPizza && window.innerWidth >= 768 && (
                <img
                    ref={activeImgRef}
                    src={selectedPizza.img}
                    alt={selectedPizza.name}
                    className='fixed z-30 object-cover'
                    style={{
                        boxShadow: '0 0 80px rgba(141,15,15,0.4)',
                        pointerEvents: 'auto',
                    }}
                    onMouseEnter={() => {
                        gsap.to(activeImgRef.current, {
                            rotation: '+=360',
                            duration: 2,
                            ease: 'power1.inOut',
                            repeat: -1,
                        });
                    }}
                    onMouseLeave={() => {
                        gsap.killTweensOf(activeImgRef.current);
                        gsap.to(activeImgRef.current, {
                            rotation: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                        });
                    }}
                />
            )}

            {/* Detail Content */}
            {isOpen && selectedPizza && (
                <div ref={detailContentRef}
                    className='fixed inset-0 z-20 bg-zinc-900 md:bg-transparent flex flex-col md:flex-row md:items-center overflow-y-auto'
                    style={{ opacity: 0 }}>

                    {/* صورة على الموبايل بس */}
                    <div className='md:hidden w-full h-56 overflow-hidden flex-shrink-0'>
                        <img src={selectedPizza.img} className='w-full h-full object-cover' alt={selectedPizza.name} />
                    </div>

                    {/* Content */}
                    <div className='w-full md:w-1/2 px-6 md:px-16 py-6 flex flex-col gap-4'>
                        <button onClick={closeDetail}
                            className='flex items-center gap-2 text-gray-400 hover:text-white transition-all cursor-pointer w-fit text-lg'>
                            ← Back
                        </button>
                        <h1 className='text-white text-3xl md:text-5xl font-bold leading-tight'>{selectedPizza.name}</h1>
                        <Stars rating={selectedPizza.rating} />
                        <p className='text-gray-300 text-base md:text-lg leading-relaxed'>{selectedPizza.desc}</p>
                        <div className='flex flex-wrap gap-2'>
                            {['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'].map(ing => (
                                <span key={ing} className='px-3 py-1 rounded-full text-sm text-white'
                                    style={{ backgroundColor: 'rgb(141,15,15)' }}>
                                    {ing}
                                </span>
                            ))}
                        </div>
                        <p className='text-white text-3xl md:text-4xl font-bold'>{selectedPizza.price} EGP</p>
                        <button
                            onClick={() => handleAddToCart(selectedPizza)}
                            className='w-full md:w-fit px-10 py-4 rounded-full text-white font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1'
                            style={{ backgroundColor: 'rgb(141,15,15)' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgb(110,10,10)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgb(141,15,15)'}>
                            Add to Cart 🍕
                        </button>
                    </div>
                </div>
            )}

            {/* Grid */}
            <div ref={gridRef} className='px-4 md:px-20 py-10'>
                <h1 className='text-white text-3xl md:text-4xl font-bold text-center mb-10'>Italy Pizza Menu</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {pizzas.map((pizza, index) => (
                        <div
                            key={pizza.id}
                            ref={el => cardsRef.current[index] = el}
                            className='bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
                            <img
                                ref={el => imgRefs.current[pizza.id] = el}
                                src={pizza.img}
                                className='w-full h-48 object-cover'
                                alt={pizza.name}
                            />
                            <div className='p-4 flex flex-col gap-2 flex-1'>
                                <h2 className='text-lg font-bold'>{pizza.name}</h2>
                                <p className='text-gray-500 text-sm flex-1'>{pizza.desc}</p>
                                <p className='text-right font-bold'>{pizza.price}EGP</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => openDetail(pizza)}
                                        className='flex-1 py-2 rounded-xl font-bold cursor-pointer border-2 border-zinc-300 transition-all duration-300 hover:-translate-y-1'
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                                        View Item
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(pizza)}
                                        className='flex-1 py-2 rounded-xl font-bold cursor-pointer border-2 transition-all duration-300 hover:-translate-y-1'
                                        style={{ backgroundColor: 'black', color: 'white' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgb(141,15,15)'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'black'}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;