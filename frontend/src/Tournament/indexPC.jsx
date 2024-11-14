import Navbar from "../../src/components/Navbar/index";
import NavbarPC from "../components/Navbar/indexPC";

import "./tournament.css";
import axios from "../../src/axiosConfig";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import lol_game from "../assets/lol_t.webp";

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
    <div className="org_register">
    <NavbarPC/>
    <div className="sub_main_tournament">
        <div className="title">
            <h1 id="h1_R">Torneios</h1>
        </div>
        <section className="info_tournament">
            <div className="title_t">
                <h5>Jogo Selecionado: aqui</h5>
            </div>
            <div className="info_game">
                <div className="ig_left">
                    <div className="img_game">
                        <img src={lol_game} alt="" />
                    </div>
                </div>
                <div className="ig_right">
                    <h3>Informações do Torneio</h3>
                    <h5>Número de Participantes: variável aqui</h5>
                    <h5>Dono do Torneio: variável aqui</h5>
                    <h5>Data de Início: variável aqui</h5>
                </div>
            </div>
            <div className="description">
                <p>League of Legends" (LoL) é um jogo de estilo MOBA (Multiplayer Online Battle Arena) criado pela Riot Games, onde duas equipes de cinco jogadores competem para destruir a base principal adversária, o Nexus. Cada jogador escolhe um "campeão" com habilidades únicas, atuando em um dos vários papéis dentro da equipe, como tanque, assassino ou suporte. As partidas ocorrem em um mapa com três rotas principais e uma selva, exigindo coordenação e estratégias complexas entre os jogadores. Com mais de 150 campeões e uma mecânica de evolução contínua durante a partida, o jogo oferece grande variedade e profundidade.</p>
            </div>
        </section>
        
      
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
    </div>
  );
}

export default Tournament;
