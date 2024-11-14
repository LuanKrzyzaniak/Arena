import React, { useEffect, UseState } from "react";

import "./style.css";
import axios from '../../axiosConfig'
import { useNavigate } from "react-router-dom";
import imageLogin from "../../assets/img_login.png"

function Register() {

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const navigate = useNavigate();

  async function navigateLogin(){
    navigate("/login");
  }

  async function handleSubmit() {
    if (password === confirm) {
      try {
        const res = await axios.post("/player/create", { username, email, password });
        if (res.data.statusCode === 333) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        alert("Credenciais Inválidas");
      }
    } else {
      alert("Senhas diferentes")
    }
  }

  return (

    <div className="MR_main">

      <div className="MR_panel">

        <h1 className="MR_title">Cadastro de Usuário</h1>
        <div className="MR_info">

          <div className="MR_item">
            <input onChange={(e) => setUsername(e.currentTarget.value)} type="text" name="" id="MR_name" className="MR_input" placeholder="Nome de Usuário" />
          </div>

          <div className="MR_item">
            <input onChange={(e) => setEmail(e.currentTarget.value)} type="text" name="" id="MR_email" className="MR_input" placeholder="Email" />
          </div>
          
          <div className="MR_item">
            <input onChange={(e) => setPassword(e.currentTarget.value)} type="password" name="" id="MR_password" className="MR_input" placeholder="Senha"/>
          </div>

          <div className="MR_item">
            <input onChange={(e) => setConfirm(e.currentTarget.value)} type="password" name="" id="MR_confirm" className="MR_input" placeholder="Confirme a senha"/>
          </div>

        </div>
        <div className="MR_confirmation">
          <button onClick={handleSubmit} className="MR_button">Cadastrar</button>
          <button onClick={navigateLogin} className="MR_login">Já possui uma conta? Entre aqui</button>
        </div>
      </div>

      <div className="MR_image">
        <img src={imageLogin} alt="Pessoa jogando em um filtro vermelho" />
      </div>
    </div>

  );
}
export default Register;
