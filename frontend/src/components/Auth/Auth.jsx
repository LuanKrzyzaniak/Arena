import { useEffect, useState } from 'react';
import axios from "../../axiosconfig.js";

function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get('/user/check', { withCredentials: true });
        setIsAuthenticated(res.status === 200 && res.data.auth);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  return isAuthenticated;
}

export default Auth;