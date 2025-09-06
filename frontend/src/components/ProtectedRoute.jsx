import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, token } = useContext(AuthContext);

    if (!token || !user) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;


