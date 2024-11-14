import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

import NavbarPC from "../../components/Navbar/indexPC";
import "./style.css";

function Register() {
  const [Name, setName] = useState("");
  const [TournamentDate, setTournamentDate] = useState("");
  const [Sport, setSport] = useState("");
  const [sportList, setSportList] = useState([]); 
  const [Organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]); 

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      console.log(Name, TournamentDate, Sport)
      const res = await axios.post(`/tournament/create/${Organization}`, {
        Name,
        TournamentDate,
        Sport,
      }, {withCredentials: true});
      console.log(res.data.statusCode)
      if (res.data.status === 333) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);  
      alert("Torneio não criado");
    }
  }

  useEffect(() => {
    getSport();
    getOrganization();
  }, []);

  async function getSport() {
    try {
      const resSport = await axios.get("/tournament/sports");
      const auxSport = resSport.data.data; 
      setSportList(auxSport || []); 
    } catch (error) {
      console.log(error);
      setSportList([]); 
    }
  }

  async function getOrganization() {
    try {
      const resOrgs = await axios.get("/player/", {
        withCredentials: true
      });
      console.log(resOrgs)
      const auxOrgs = resOrgs.data.data.orgs; 
      setOrganizationList(auxOrgs || []); 
    } catch (error) {
      console.log(error);
      setOrganizationList([]); 
    }
  }
  return (
    <div className="org_register">
      <NavbarPC />
      <div className="sub_main_pc bg_tournment ">
        <div className="title">
          <h1 id="h1_R">Cadastro de Torneio</h1>
        </div>

        <div className="org_text">
          <div className="DTR_info">
            <div className="TR_panel" id="col_register_left">
              <div className="cols_item">
                <label htmlFor="" className="label_register">
                  Nome do Torneio
                </label>
                <input
                  onChange={(e) => setName(e.currentTarget.value)}
                  type="text"
                  className="inputs_register"
                />
              </div>

              <div className="cols_item">
                <label htmlFor="" className="label_register">
                  Data do Torneio
                </label>
                <input
                  onChange={(e) => setTournamentDate(e.currentTarget.value)}
                  type="date"
                  className="inputs_register"
                />
              </div>

              
            </div>

            <div className="TR_panel" id="col_register_left">

            <div className="cols_item">
              <label className="TR_text" htmlFor="sport">
                Esporte
              </label>
              <select
                onChange={(e) => setSport(e.target.value)}
                className="inputs_register"
                id="sport"
              >
                <option value="">SELECIONE UM ESPORTE</option>
                {sportList && sportList.length > 0 ? (
                  sportList.map((i) => (
                    <option key={i.sid} value={i.sid}>
                      {i.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Carregando esportes...</option>
                )}
              </select>
              </div>

              <div className="cols_item">
              <label className="TR_text" htmlFor="org">
                Organização
              </label>
              <select
                onChange={(e) => setOrganization(e.target.value)}
                className="inputs_register"
                id="org"
              >
                <option value="">SELECIONE UMA ORGANIZAÇÃO</option>
                {sportList && sportList.length > 0 ? (
                  organizationList.map((i) => (
                    <option key={i.sid} value={i.sid}>
                      {i.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Carregando esportes...</option>
                )}
              </select>
              </div>

              <div className="div_button">
                <button onClick={handleSubmit} id="button_R" className="DTR_button">
                  CADASTRAR
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
