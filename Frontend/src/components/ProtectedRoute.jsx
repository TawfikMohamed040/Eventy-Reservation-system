import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setCredentials } from '../rtk/slices/credentials-slice';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = useSelector(state => state.credentials.token);
  const user = useSelector(state => state.credentials.user);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!token || !user) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const parsedUser = parseJwt(storedToken);
        if (parsedUser) {
          dispatch(setCredentials({ token: storedToken, user: parsedUser }));
        }
      }
    }
    setCheckingAuth(false);
  }, [dispatch, token, user]);

  const getRoleFromUser = () => {
    return user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  };

  if (checkingAuth) return null; 

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && getRoleFromUser() !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
