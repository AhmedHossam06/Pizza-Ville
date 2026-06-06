import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './HomePage';
import Menu from './Menu';
import ContactUs from './ContactUs';
import Cart from './Cart';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import SignUp from './SignUp';
import ProtectedRoute from './components/ProtectedRoute';
function App(){
  const [cart, setCart] = useState([]);

  function addToCart(pizza) {
    setCart(prevCart => {
        const existing = prevCart.find(item => item.id === pizza.id);
        if (existing) {
            return prevCart.map(item =>
                item.id === pizza.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            return [...prevCart, { ...pizza, quantity: 1 }];
        }
    });
}
  function clearCart() {
    setCart([]);
  }
  function removeFromCart(pizzaId) {
    setCart(prevCart => prevCart.filter(item => item.id !== pizzaId));
}

function decreaseQuantity(pizzaId) {
    setCart(prevCart => prevCart
        .map(item => item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
}
  return(
    <AuthProvider>
        <BrowserRouter>
            <Navbar/>
              <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/menu' element={<Menu addToCart={addToCart}/>}/>
                  <Route path='/contact_us' element={<ContactUs/>}/>
                  <Route path='/cart' element={<ProtectedRoute>
        <Cart cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} addToCart={addToCart}/>
    </ProtectedRoute>}/>
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
              </Routes>
            <Footer />
        </BrowserRouter>
    </AuthProvider>
  );
}
export default App;