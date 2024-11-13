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

  const { player } = useParams();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const res = await axios.post(`/tournament/create/${player}`, {
        Name,
        TournamentDate,
        Sport,
      });
      if (res.data.status === 333) {
        navigate("/login");
        alert("CRIADO");
      }
    } catch (error) {
      console.log(error);
      alert("Torneio não criado");
    }
  }

  useEffect(() => {
    getFormat();
  }, []);

  async function getFormat() {
    try {
      const resSport = await axios.get("/tournament/sports");
      const auxSport = resSport.data.data; 
      setSportList(auxSport || []); 
    } catch (error) {
      console.log(error);
      setSportList([]); 
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
          <div className="infos_right">
            <div className="cols_register" id="col_register_left">
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

            <div className="cols_register">
              <label className="TR_text" htmlFor="sport">
                Esporte
              </label>
              <select
                onChange={(e) => setSport(e.target.value)}
                className="TR_input"
                id="sport"
              >
                <option value="">SELECIONE UM E-SPORTE</option>
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
              <div className="div_button">
                <button onClick={handleSubmit} id="button_R">
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
