import { useEffect, useState } from 'react';
import axios from "../../axiosConfig";

function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    
    async function checkAuth() {
      try {
        const res = await axios.post('/user/check', { withCredentials: true });
        
        setIsAuthenticated(res.status === 200 && res.data.auth);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error)
      }
    }

    checkAuth();
  }, []);

  return isAuthenticated;
}

export default Auth;