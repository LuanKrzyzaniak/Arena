import React, { useEffect, UseState } from "react";

import "./style.css";
import axios from '../../axiosConfig'
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");



  const navigate = useNavigate();

  async function handleSubmit() {
    if (password === confirm) {
      const birthdate = `${year}-${month}-${day}`;
      try {
        const res = await axios.post("/user/create", { email, username, birthdate, password });
        if (res.status === 201) {
          navigate('/');
          alert("CRIADO")
        }
      } catch (error) {
        console.log(error);
        alert("CREDENCIAIS INVALIDAS");
      }
    } else {
      alert("Senhas diferentes")
    }



  }

  return (


    <div className="R_main">
      <div className="sub_main">
        <h1 id="h1_R">Cadastro de usuário</h1>
        <div className="div_R">
          <input onChange={(e) => setEmail(e.currentTarget.value)} className="inputs_R" placeholder="Email"></input>
          <input onChange={(e) => setUsername(e.currentTarget.value)} className="inputs_R" placeholder="Nome de Usuário"></input>
        </div>
        <div className="div_R2">
          <div className="date">
            <input onChange={(e) => setDay(e.currentTarget.value)} id="day" type="number" className="inputData" placeholder="Dia"></input>
            <p className="bar">/</p>
            <input onChange={(e) => setMonth(e.currentTarget.value)} type="number" className="inputData" placeholder="Mês"></input>
            <p className="bar">/</p>
            <input onChange={(e) => setYear(e.currentTarget.value)} type="number" className="inputData" placeholder="Ano"></input>
          </div>
          <input className="inputs_R2" placeholder="Número de telefone"></input>
        </div>
        <div className="div_R">
          <input
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="inputs_R"
            type="password"
            placeholder="Senha"
          ></input>
          <input
            onChange={(e) => setConfirm(e.currentTarget.value)}
            className="inputs_R"
            type="password"
            placeholder="Confirme sua senha"
          ></input>
        </div>
        <div className="div_button">
          <button onClick={handleSubmit} id="button_R">CADASTRAR</button>
        </div>
      </div>
    </div>
  );
}
export default Register;
