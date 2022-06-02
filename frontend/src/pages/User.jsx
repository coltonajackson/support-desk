import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../features/users/userSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function User() {
  const { user, isLoading, isError, message } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const { userId } = useParams();

  console.log(userId);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUser(userId));
    // eslint-disable-next-line
  }, [userId]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <BackButton url='/users' />
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h4>Is Staff Member: {user.isStaff ? 'Yes' : 'No'}</h4>
      <h4>Is Administrator: {user.isAdmin ? 'Yes' : 'No'}</h4>
      <h6>Date Created: {user.createdAt}</h6>
      <h6>Date Updated: {user.updatedAt}</h6>
    </div>
  )
}

export default User;