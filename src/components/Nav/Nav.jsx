import React from 'react';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <h2 className="nav-title">FREEBEE</h2>
    </div>
  );
}

export default Nav;
