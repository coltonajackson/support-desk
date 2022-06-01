import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../features/auth/authSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function User() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { selectedUser, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUser(userId));
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <BackButton url='/users' />
      <h1>{selectedUser.name}</h1>
      <h2>{selectedUser.email}</h2>
      <h4>Is Staff Member: {selectedUser.isStaff ? 'Yes' : 'No'}</h4>
      <h4>Is Administrator: {selectedUser.isAdmin ? 'Yes' : 'No'}</h4>
      <h6>Date Created: {selectedUser.createdAt}</h6>
      <h6>Date Updated: {selectedUser.updatedAt}</h6>
    </div>
  )
}

export default User;