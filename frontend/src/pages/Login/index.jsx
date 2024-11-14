import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import imageLogin from "../../assets/img_login.png";

function Login() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  // // const isAuthenticated = Auth();
  const navigate = useNavigate();


  // useEffect(() => {
  //   if(isAuthenticated){
  //     alert("JA AUTENTICADO")
  //     navigate('/');
  //   }
  // }, [,isAuthenticated,navigate]);

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

    <div className="ML_main">

      <div className="ML_panel">

        <h1 className="ML_title">Login</h1>
        <div className="ML_info">

          <div className="ML_item">
            <input onChange={(e) => setLogin(e.currentTarget.value)} type="text" name="" id="ML_login" className="ML_input" placeholder="Email" />
          </div>

          <div className="ML_item">
            <input onChange={(e) => setPassword(e.currentTarget.value)} type="password" name="" id="ML_password" className="ML_input" placeholder="Senha"/>
          </div>

        </div>
        <div className="ML_confirmation">
          <button onClick={handleSubmit} className="ML_button">Entrar</button>
          <button onClick={navigateRegister}className="ML_login">Criar uma conta</button>
        </div>
      </div>

      <div className="ML_image">
        <img src={imageLogin} alt="Pessoa jogando em um filtro vermelho" />
      </div>
    </div>

  );
}
export default Login;
