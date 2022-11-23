import React from 'react';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <h1 className='title'>FREEBEE</h1>
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>

      <Footer />
    </div>
    </div>
  );
}

export default RegisterPage;
