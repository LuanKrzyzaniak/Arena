import "./style.css";
import Navbar from "../../components/Navbar";

import React, {useState} from "react";

function TournamentRegister() {


    const [Name, setName] = React.useState("");
    const [TournamentDate, setTournamentDate] = React.useState("");
    const [JoinDate, setJoinDate] = React.useState("");
    const [Prize, setPrize] = React.useState("");
    const [Capacity, setCapacity] = React.useState("");
    const [Format, setFormat] = React.useState("");


    return (
        <div className="TR_div_main">
            <Navbar></Navbar>
            <h1 className="TR_title">CADASTRO DE TORNEIO</h1>
            <div className="TR_div_form">

                <label className="TR_text" for="name">NOME</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="name"></input>

                <div className="TR_div_dates">
                    <label className="TR_text" for="tournamentDate">DATA DO TORNEIO</label>
                    <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="tournamentDate" type="date"></input>

                    <label className="TR_text" for="joinDate">DATA DE INSCRIÇÃO MAX</label>
                    <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="joinDate"></input>
                </div>
                
                <label className="TR_text" for="prize">PREMIAÇÃO</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="prize"></input>

                <label className="TR_text" for="capacity">CAPACIDADE</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="capacity"></input>

                <label className="TR_text" for="format">FORMATO</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="format"></input>

            </div>
        </div>
    )

}
export default TournamentRegister;