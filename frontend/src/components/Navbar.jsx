// import React, { useState, useContext } from 'react'; 
// import { Menu, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const { user, logout } = useContext(AuthContext); 
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout(); 
//         navigate('/auth');
//     };

//     return (
//         <nav className='fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-white to-sky-50/80 border-b border-gray-200'>
//             <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3'>
//                 <Link className='flex items-center' to={'/'}>
//                     <img width={70} src="/logo.png" alt="JobFit-AI Logo" />
//                     <h1 className='text-xl font-roboto font-semibold'>JobFit-AI</h1>
//                 </Link>

//                 {/* Dekstop view */}
//                 <div className='hidden md:flex items-center gap-6'>
//                     <a href="/#home" className='hover:text-blue-500'>Home</a>
//                     <a href="/#about" className='hover:text-blue-500'>About</a>
//                     {user ? (
//                         <>
//                             <Link to="/chat" className='hover:text-blue-500'>Analyzer</Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className='px-3 py-1.5 bg-red-500 text-white rounded active:scale-90 transition-all duration-300 shadow-sm hover:bg-red-600'
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <Link to={'/auth'}>
//                             <button className='px-3 py-1.5 bg-blue-500 text-white rounded active:scale-90 transition-all duration-300 shadow-sm hover:bg-blue-600'>
//                                 Login/Signup
//                             </button>
//                         </Link>
//                     )}
//                 </div>

//                 {/* mobile view */}
//                 <button className='md:hidden text-gray-700' onClick={() => setIsOpen(!isOpen)}>
//                     {isOpen ? <X size={28} /> : <Menu size={28} />}
//                 </button>
//             </div>
//             {isOpen && (
//                 <div className="md:hidden flex flex-col items-center gap-6 py-8 bg-white/95 backdrop-blur-md">
//                     <a href="/#home" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Home</a>
//                     <a href="/#about" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>About</a>
                    
//                     {user ? (
//                         <>
//                             <Link to="/chat" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Analyzer</Link>
//                             <button onClick={() => { handleLogout(); setIsOpen(false); }} className='px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm'>
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <Link to={'/auth'} onClick={() => setIsOpen(false)}>
//                             <button className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm'>
//                                 Login/Signup
//                             </button>
//                         </Link>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;

import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <nav className='fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200'>
            <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-3'>
                <Link className='flex items-center gap-2' to={'/'}>
                    <img width={40} src="/logo.png" alt="JobFit-AI Logo" />
                    <h1 className='text-xl font-roboto font-semibold text-gray-800'>JobFit-AI</h1>
                </Link>

                {/* Desktop view */}
                <div className='hidden md:flex items-center gap-6'>
                    <a href="/#home" className='text-gray-600 hover:text-blue-500 transition-colors'>Home</a>
                    <a href="/#about" className='text-gray-600 hover:text-blue-500 transition-colors'>About</a>
                    {user ? (
                        <>
                            <Link to="/chat" className='text-gray-600 hover:text-blue-500 transition-colors'>Analyzer</Link>
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 bg-red-500 text-white rounded-lg active:scale-95 transition-all duration-300 shadow-sm hover:bg-red-600'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to={'/auth'}>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg active:scale-95 transition-all duration-300 shadow-sm hover:bg-blue-600'>
                                Login / Signup
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile view */}
                <button className='md:hidden text-gray-700' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-6 py-8 bg-white/95 backdrop-blur-md">
                    <a href="/#home" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Home</a>
                    <a href="/#about" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>About</a>
                    {user ? (
                        <>
                            <Link to="/chat" onClick={() => setIsOpen(false)} className='hover:text-blue-500 font-roboto text-lg'>Analyzer</Link>
                            <button onClick={() => { handleLogout(); setIsOpen(false); }} className='px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to={'/auth'} onClick={() => setIsOpen(false)}>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm'>
                                Login / Signup
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;


