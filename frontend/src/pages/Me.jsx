import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../features/auth/authSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Me() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <BackButton url='/' />
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h4>Is Staff Member: {user.isStaff ? 'Yes' : 'No'}</h4>
      <h4>Is Administrator: {user.isAdmin ? 'Yes' : 'No'}</h4>
    </div>
  )
}

export default Me;