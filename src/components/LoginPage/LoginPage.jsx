import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <div>
    <h1 className='title'>FREEBEE</h1>
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="reg_btn"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>

      <Footer />
    </div>
    </div>
  );
}

export default LoginPage;
