import React from 'react';

import './style.css';

import logo from '../../assets/logo_def.png';
import imgLogin from '../../assets/img_login.png';
import axios from "../../axiosConfig";
import { useNavigate } from 'react-router-dom';

function LoginPC() {

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate()

  async function navigateRegister(){
    navigate("/register");
  }

  async function handleSubmit() {
    try {
      const infoType = login.includes('@') ? "email" : "username";

      const res = await axios.post(
        "/player/login",
        { login, password, infoType},
      );
      if (res.data.statusCode === 111) {
        console.log("LOGADO");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("CREDENCIAIS INVALIDAS");
    }
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
            <input onChange={(e) => {setLogin(e.currentTarget.value)}}type="text" placeholder='Nome de Usuário' />
            <input onChange={(e) => {setPassword(e.currentTarget.value)}}type="password" placeholder='Senha'  />
            
            <button onClick={handleSubmit} className='btn_login'>Entrar</button>
            <button onClick={navigateRegister}className="DL_login">Criar uma conta</button>
        </div>
     </section>
    </div>
  )
}

export default LoginPC;