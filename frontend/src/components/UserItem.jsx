import { Link } from 'react-router-dom';

function UserItem({ user }) {
  return (
    <div className="ticket">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.isStaff ? 'Yes' : 'No'}</div>
      <div>{user.isAdmin ? 'Yes' : 'No'}</div>
      <Link to={`/users/${user._id}`} className='btn btn-reverse'>View</Link>
    </div>
  )
}

export default UserItem;