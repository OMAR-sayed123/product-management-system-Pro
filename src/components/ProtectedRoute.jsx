// Route guard: prevents unauthenticated users from opening private pages.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authservice';

const ProtectedRoute = ({ children }) => {
    // A missing session means the visitor must return to the login page.
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
