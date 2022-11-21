import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Footer from '../Footer/Footer';
import {useSelector, useDispatch} from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  // useEffect(() => {
  //   dispatch({
  //     type: "ADD_TEXT",
  //   })
  // }, []);

  return (
    <div className="container">
      <h2 className='welcome-banner'>WELCOME {user.username}!</h2>
      <Link to="/addtrial">
        <button className='main-btns'>NEW TRIAL</button>
      </Link>
      <Link to="/trials">
        <button className='main-btns'>TRIAL LIST</button>
      </Link>
      <Link to="/history">
        <button className='main-btns'>HISTORY</button>
      </Link>

      <LogOutButton className="logout-btn" />
      <Footer />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
