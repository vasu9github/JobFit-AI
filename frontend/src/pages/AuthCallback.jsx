import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (token && userString) {
            try {
                const user = JSON.parse(decodeURIComponent(userString));
                login(user, token);
                navigate('/');
            } catch (error) {
                console.error("Failed to parse user data from URL", error);
                navigate('/auth?error=InvalidUserData');
            }
        } else {
            console.error("Token or user data missing in callback URL");
            navigate('/auth?error=AuthenticationFailed');
        }
    }, [searchParams, navigate, login]);
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-semibold">Signing you in...</p>
        </div>
    );
};

export default AuthCallback;