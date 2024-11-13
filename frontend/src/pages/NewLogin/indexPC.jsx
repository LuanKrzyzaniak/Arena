import React from 'react';

import './style.css';

import logo from '../../assets/logo_def.png';
import imgLogin from '../../assets/img_login.png';
import FormSubmitButton from '../../components/FormSubmitButton';
import axios from 'axios';

function LoginPC() {

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post("/user/login",
      { usename: e.target[0].value, password: e.target[1].value },
      { withCredentials: true }
    );

    console.log(response);
  }

  return (
    <div className='LoginPC'>
     <section className='img_left'>
        <img src={imgLogin} alt="" />
     </section>
     <section className='info_right'>
        <div className='logo_right'>
            <img src={logo} alt="" />
        </div>
        <div className='inputs_right'>
            <input type="text" placeholder='Nome de Usuário' />
            <input type="text" placeholder='Senha'  />
            
            <button className='btn_login'>Entrar</button>
        </div>
     </section>
    </div>
  )
}

export default LoginPC;