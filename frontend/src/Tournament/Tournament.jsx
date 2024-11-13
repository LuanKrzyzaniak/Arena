import Navbar from "../../src/components/Navbar/index";
import "./tournament.css";
import axios from "../../src/axiosConfig";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Tournament() {
  const [teams, setTeams] = React.useState([]);
  const aux = useParams();
  const id = aux.id;

  useEffect(() => {
    getTeams();
  }, []);

  async function getTeams() {
    try {
      const res = await axios.get(`/tournament/random/${id}`);
      if (res.status == 200) {
        const teamsData = Array.isArray(res.data.teams)
          ? res.data.teams
          : Object.values(res.data.teams || {});
        setTeams(teamsData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Função para dividir os times em pares
  const pairTeams = () => {
    const pairs = [];
    for (let i = 0; i < teams.length; i += 2) {
      pairs.push(teams.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <>
    <div className="container">
      
      {teams.length > 0 ? (
        pairTeams().map((pair, index) => (
          <div key={index} className="match-box">
            {pair[0] && (
              <div className="team-box">{pair[0] || "Sem nome"}</div>
            )}
            <span className="vs">VS</span>
            {pair[1] && (
              <div className="team-box">{pair[1] || "Sem nome"}</div>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum time encontrado</p>
      )}
    </div>
    </>
  );
}

export default Tournament;
