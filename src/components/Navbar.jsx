import { NavLink, useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            background: '#18181b',
            color: '#ffffff',
            confirmButtonColor: 'rgb(141,15,15)',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/');
            }
        });
    }

    return (
        <div className="w-full bg-black">
            {/* Main Navbar */}
            <div className="flex items-center justify-between px-6 lg:px-10 py-4">
                <Link to="/" className="text-white text-2xl md:text-3xl">
                PIZZA VILLE
                </Link>
                {/* <h1 className="text-white text-2xl md:text-3xl"></h1> */}

                {/* Hamburger */}
                <button className="text-white lg:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✕' : '☰'}
                </button>

                {/* Desktop Links */}
                <nav className="hidden lg:flex items-center text-white gap-8 text-xl">
                    <NavLink className="hover:opacity-70" style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/">Home</NavLink>
                    <NavLink className="hover:opacity-70" style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/menu">Menu</NavLink>
                    <NavLink className="hover:opacity-70" style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/contact_us">Contact us</NavLink>
                    <NavLink className="hover:opacity-70" style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/cart">Cart</NavLink>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-base">Hi, {user.username} 👋</span>
                            <button onClick={handleLogout}
                                className="px-4 py-2 rounded-full border-2 border-white text-white text-base font-bold cursor-pointer hover:bg-[rgb(141,15,15)] transition-all duration-300">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <NavLink to="/login"
                                className="px-4 py-2 rounded-full border-2 border-white text-white text-base font-bold hover:bg-[rgb(141,15,15)] transition-all duration-300">
                                Login
                            </NavLink>
                            <NavLink to="/signup"
                                className="px-4 py-2 rounded-full text-white text-base font-bold transition-all duration-300"
                                style={{backgroundColor: 'rgb(141,15,15)'}}>
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </nav>
            </div>

            {/* Mobile Menu - بيدفع الـ content لتحت */}
           {/* Mobile Menu */}
<div className={`w-full bg-black flex flex-col items-center gap-6 py-6 lg:hidden border-t border-zinc-800 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 py-0'}`}>
    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/">Home</NavLink>
    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/menu">Menu</NavLink>
    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/contact_us">Contact us</NavLink>
    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/cart">Cart</NavLink>
    {user ? (
        <>
            <span className="text-gray-400">Hi, {user.username} 👋</span>
            <button onClick={handleLogout} className="text-white border-2 border-white px-4 py-2 rounded-full cursor-pointer">Logout</button>
        </>
    ) : (
        <>
            <NavLink onClick={() => setMenuOpen(false)} to="/login" className="text-white">Login</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/signup" className="text-white">Sign Up</NavLink>
        </>
    )}
</div>
        </div>
    );
}
export default Navbar;