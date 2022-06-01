import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserFriends } from 'react-icons/fa';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <>
            {(user.isStaff || user.isAdmin) && (
              <li>
                <Link to='/users' className="btn btn-reverse">
                  <FaUserFriends /> Users
                </Link>
              </li>
            )}
            <li>
              <Link to='/me' className="btn btn-success">
                <FaUser /> Me
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) 
        : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
            <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
        
      </ul>
    </header>
  )
}

export default Header;