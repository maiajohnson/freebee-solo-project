import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import NewTrialPage from "../NewTrialPage/NewTrialPage";
import TrialList from '../TrialList/TrialList';
// import History from '../History/History';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
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
      {/* <NewTrialPage />
      <TrialList />
      <History /> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
