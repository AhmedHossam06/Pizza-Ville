import { NavLink, useNavigate } from 'react-router-dom';
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
        <div className="w-full bg-black flex items-center justify-between px-6 md:px-10 py-4">
            <h1 className="text-white text-2xl md:text-3xl">PIZZA VILLE</h1>

            {/* Hamburger */}
            <button className="text-white md:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center text-white gap-8 text-xl">
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

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden z-50">
                    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/">Home</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/menu">Menu</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/contact_us">Contact us</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} style={({ isActive }) => ({ color: isActive ? 'rgb(141, 15, 15)' : 'white' })} to="/cart">Cart</NavLink>
                    {user ? (
                        <>
                            <span className="text-gray-400">Hi, {user.username} 👋</span>
                            <button onClick={handleLogout} className="text-white border-2 border-white px-4 py-2 rounded-full">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => setMenuOpen(false)} to="/login" className="text-white">Login</NavLink>
                            <NavLink onClick={() => setMenuOpen(false)} to="/signup" className="text-white">Sign Up</NavLink>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
export default Navbar;