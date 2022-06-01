import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isExpired } from 'react-jwt';
import { logout, reset } from '../features/auth/authSlice';

const PersistLogin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isTokenExpired = user ? isExpired(user.token) : false;

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(logout());
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [isTokenExpired]);

  return <Outlet />
}

export default PersistLogin;