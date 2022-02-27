import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../services/actions/authAction';

import "./style.css";

const Header = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.sessions);
  
  const [activeModal, setActiveModal] = useState({ name: "", type: "", active: false });

  return (
    <>
      { session.user && (
        <span className="btn-logout" onClick={() => dispatch(logoutUser())}>Logut</span>
      )}
    </>
    // <div>
    //     <Link to="/">Home</Link>
    //     <span>|</span>
    //     { session.user ? (
    //       <span onClick={() => dispatch(logoutUser())}>Logut</span>
    //     ) : (
    //       <Link to="/login">Login</Link>
    //     )
    //     }
    // </div>
  )
}

export default Header;
