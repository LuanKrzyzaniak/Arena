import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../components/Auth/Auth";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isAuthenticated = Auth();
  const navigate = useNavigate();


  useEffect(() => {
    if(isAuthenticated){
      alert("JA AUTENTICADO")
      navigate('/');
    }
  }, [,isAuthenticated,navigate]);


  async function handleSubmit() {
    try {
      const res = await axios.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("CREDENCIAIS INVALIDAS");
    }
  }

  return (
    <div class="mainClass">
      <div class="loginDiv">
        <img id="logo" src={logo} alt="Logo arena"></img>
      </div>

      <div class="loginDiv">
        <input
          class="inputs"
          type="text"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Email"
        ></input>
        <input
          class="inputs"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Senha"
        ></input>
        <button onClick={handleSubmit} id="button">
          ENTRAR
        </button>
        <button id="forgot">Esqueci minha senha</button>
      </div>
    </div>
  );
}
export default Login;
