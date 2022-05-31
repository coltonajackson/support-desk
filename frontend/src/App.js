import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import PersistLogin from './components/PersistLogin';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import Missing from './pages/Missing';

function App() {

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* Private Routes */}
            <Route element={<PersistLogin />}>
              <Route path='/new-ticket' element={<PrivateRoute />}>
                <Route path='/new-ticket' element={<NewTicket />} />
              </Route>
              <Route path='/tickets' element={<PrivateRoute />}>
                <Route path='/tickets' element={<Tickets />} />
              </Route>
              <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
                <Route path='/ticket/:ticketId' element={<Ticket />} />
              </Route>
              </Route>
            {/* Catch All */}
            <Route path='/*' element={<Missing />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;