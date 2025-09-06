import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import Chat from './pages/Chat';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const location = useLocation();
    const showNavbar = !['/auth', '/auth/callback'].includes(location.pathname);

    return (
        <main>
            {showNavbar && <Navbar />}
            
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
        </main>
    );
};

export default App;