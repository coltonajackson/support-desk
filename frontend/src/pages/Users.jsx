import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, reset } from '../features/users/userSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import UserItem from '../components/UserItem';

function Users() {
  const { users, isLoading } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Users</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Name</div>
          <div>Email</div>
          <div>isStaff</div>
          <div>isAdmin</div>
          <div></div>
        </div>
        {users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </>
  )
}

export default Users;