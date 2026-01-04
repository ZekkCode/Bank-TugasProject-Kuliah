import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGuard;
