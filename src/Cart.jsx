import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Cart({ cart, clearCart, removeFromCart, decreaseQuantity, addToCart }) {
    const total = cart.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);

    function handleCheckout() {
        Swal.fire({
            title: 'Confirm Order?',
            text: `Total: ${total} EGP`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, order!',
            cancelButtonText: 'Cancel',
            background: '#18181b',
            color: '#ffffff',
            confirmButtonColor: 'rgb(141,15,15)',
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire({
                    title: 'Order Placed! 🍕',
                    text: 'Your order is being prepared',
                    icon: 'success',
                    background: '#18181b',
                    color: '#ffffff',
                    confirmButtonColor: 'rgb(141,15,15)',
                });
            }
        });
    }

    return (
        <div className='bg-zinc-900 min-h-screen px-6 md:px-20 py-10'>
            <h1 className='text-white text-4xl font-bold text-center mb-10'>Your Cart</h1>

            {cart.length === 0 ? (
                <div className='text-center'>
                    <p className='text-gray-400 text-xl mb-6'>Your cart is empty 🍕</p>
                    <Link to='/menu'>
                        <button className='px-8 py-3 rounded-full text-white font-bold cursor-pointer border-2 border-white transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: 'transparent'}}
                            onMouseEnter={e => e.target.style.backgroundColor = 'rgb(141,15,15)'}
                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            Back to Menu
                        </button>
                    </Link>
                </div>
            ) : (
                <div className='max-w-3xl mx-auto'>
                    <table className='w-full text-white mb-8'>
                        <thead>
                            <tr className='border-b border-zinc-700'>
                                <th className='text-left py-3'>Pizza</th>
                                <th className='text-center py-3'>Quantity</th>
                                <th className='text-right py-3'>Price (EGP)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((pizza, index) => (
                                <tr key={index} className='border-b border-zinc-800'>
                                    <td className='py-3 flex items-center gap-4'>
                                        <img src={pizza.img} className='w-16 h-16 object-cover rounded-lg' alt={pizza.name} />
                                        {pizza.name}
                                    </td>
                                    <td className='py-3 text-center'>
                                        <div className='flex items-center justify-center gap-3'>
                                            <button onClick={() => decreaseQuantity(pizza.id)}
                                                className='w-7 h-7 rounded-full bg-zinc-700 text-white cursor-pointer hover:bg-red-900'>
                                                −
                                            </button>
                                            {pizza.quantity}
                                            <button onClick={() => addToCart(pizza)}
                                                className='w-7 h-7 rounded-full bg-zinc-700 text-white cursor-pointer hover:bg-green-900'>
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-3 text-right'>{pizza.price * pizza.quantity} EGP</td>
                                    <td className='py-3 text-right'>
                                        <button onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: 'Do you want to remove this item?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, remove it',
                                                cancelButtonText: 'Cancel',
                                                background: '#18181b',
                                                color: '#ffffff',
                                                confirmButtonColor: 'rgb(141,15,15)',
                                            }).then((result) => {
                                                if (result.isConfirmed) removeFromCart(pizza.id);
                                            });
                                        }} className='text-red-500 hover:text-red-300 cursor-pointer transition-all'>
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-white text-2xl font-bold text-center mb-8'>
                        Total: {total} EGP
                    </h2>

                    <div className='flex flex-col items-center gap-4'>
                        <button
                            onClick={handleCheckout}
                            className='px-8 py-3 rounded-full text-white font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: 'rgb(141,15,15)'}}>
                            Checkout
                        </button>
                        <button
                            onClick={clearCart}
                            className='px-8 py-3 rounded-full text-white font-bold cursor-pointer border-2 border-white transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: 'transparent'}}
                            onMouseEnter={e => e.target.style.backgroundColor = 'rgb(141,15,15)'}
                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            Clear Cart
                        </button>
                        <Link to='/menu'>
                            <button className='text-gray-400 hover:text-white transition-all duration-300 cursor-pointer'>
                                Back to menu
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Cart;