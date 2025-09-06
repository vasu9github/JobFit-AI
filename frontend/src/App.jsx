import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import Chat from './pages/Chat';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

const App = () => {
    const location = useLocation();
    const showHeaderFooter = !['/auth', '/auth/callback'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {showHeaderFooter && <Navbar />}
                
                <Routes>
                    <Route path='/' element={
                        <>
                            <Home />
                            <About />
                        </>
                    } />
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/auth/callback' element={<AuthCallback />} />
                    <Route
                        path='/chat'
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            {showHeaderFooter && <Footer />}
        </div>
    );
};

export default App;