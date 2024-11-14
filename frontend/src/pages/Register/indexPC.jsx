import React, { useEffect, UseState } from "react";

import "./style.css";
import axios from '../../axiosConfig'
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo_def.png";
import carrousel1 from "../../assets/car1.png"
import carrousel2 from "../../assets/car2.png"
import carrousel3 from "../../assets/car3.png"

import NavbarPC from "../../components/Navbar/indexPC";

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
    <div className="org_register">
        <NavbarPC/>
        <div className="sub_main_pc">

           <div className="title">
                <h1 id="h1_R">Cadastro de usuário</h1>
           </div>
           
            <div className="org_text">

                <div className="infos_right">
                    <div className="info">
                      <div className="cols_register" id="col_register_left">
                          <div className="cols_item">
                              <label htmlFor="" className="label_register" >Nome de Usuario</label>
                              <input onChange={(e) => {setUsername(e.currentTarget.value)}}type="text" name="" id="" className="inputs_register"  />
                          </div>

                          <div className="cols_item">
                              <label htmlFor="" className="label_register" > Email </label>
                              <input onChange={(e) => {setEmail(e.currentTarget.value)}}type="text" name="" id="" className="inputs_register" />
                          </div>
                      </div>
                      <div className="cols_register">
                          <div className="cols_item">
                              <label htmlFor="" className="label_register" >Senha</label>
                              <input onChange={(e) => {setPassword(e.currentTarget.value)}}type="password" name="" id="" className="inputs_register" />
                          </div>
                          <div className="cols_item">
                              <label htmlFor="" className="label_register" >Confirme sua senha</label>
                              <input onChange={(e) => {setConfirm(e.currentTarget.value)}}type="password" name="" id="" className="inputs_register" />
                          </div>
                      </div>
                    </div>
                    <button onClick={handleSubmit} className="DR_button">Cadastrar</button>
                    <button onClick={navigateLogin} className="DR_login">Já possui uma conta? Entre aqui</button>
                </div>
            </div>
        </div>
        
        
    </div>

    
  );
}
export default Register;

{/* <div className="div_R">
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
            </div> */}