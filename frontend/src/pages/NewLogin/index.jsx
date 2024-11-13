import React from 'react';

import './style.css';

import logo from '../../assets/logo_def.png';
import FormSubmitButton from '../../components/FormSubmitButton';
import axios from "../../axiosConfig";

function Login() {

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post("/player/login",
      { usename: e.target[0].value, password: e.target[1].value },
      { withCredentials: true }
    );

    console.log(response);
  }

  return (
    <div className='Login'>
      <section className="Login-logo">
        <img src={logo} alt="Arena logo" />
      </section>
      <section className="Login-form">
        <form method='POST' onSubmit={(e) => handleSubmit(e)}>

          <div className="input">
            <input type="text" name="" id="" placeholder='Nome de usuário' />
          </div>

          <div className="input">
            <input type="password" name="" id="" placeholder='Senha' />
            <a href="/resetpass">
              <small>
                Esqueci minha senha
              </small>
            </a>
          </div>

          <div className="Login-formBtn">
            <FormSubmitButton content="Entrar" />
          </div>

          <a href="/">
            <small>
              Criar uma conta
            </small>
          </a>
        </form>
      </section>
    </div>
  )
}

export default Login;