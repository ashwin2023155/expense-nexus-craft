
import { Navigate } from 'react-router-dom';

// Redirect to login page
const Index = () => {
  return <Navigate to="/auth/login" replace />;
};

export default Index;
