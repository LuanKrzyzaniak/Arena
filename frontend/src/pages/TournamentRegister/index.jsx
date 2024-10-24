import "./style.css";
import Navbar from "../../components/Navbar";

import axios from '../../axiosConfig'

import React, {useState} from "react";
import { useNavigate} from "react-router-dom";

function TournamentRegister() {


    const [Name, setName] = React.useState("");
    const [TournamentDate, setTournamentDate] = React.useState("");
    const [JoinDate, setJoinDate] = React.useState("");
    const [Prize, setPrize] = React.useState("");
    const [Capacity, setCapacity] = React.useState("");
    const [Format, setFormat] = React.useState("");

    const navigate = useNavigate();

    async function getFormat(){

    }

    async function submitTournament() {
        // TRATAR FORMATO
        try {
            const res = await axios.post("/tournament/create", {Name, JoinDate, TournamentDate, Prize, Format, Capacity});
            if(res.status == 200){
                navigate("/");
                alert("TOURNAMENT CREATED");
            }
        } catch (error) {
            console.log(error)
            alert("TOURNAMENT NOT CREATED");
        }
    }

    return (
        <div className="TR_div_main">
            <Navbar></Navbar>
            <h1 className="TR_title">CADASTRO DE TORNEIO</h1>
            <form method="post" onSubmit={submitTournament}>
                
            <div className="TR_div_form">
                <label className="TR_text" for="name">NOME</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="name"></input>

                <div className="TR_div_dates">
                    <div style={{marginRight: "0.5rem"}}>
                        <label className="TR_text" for="tournamentDate">DATA DO TORNEIO</label>
                        <input onChange={(e) => setTournamentDate(e.currentTarget.value)} className="TR_input" id="tournamentDate" type="date"></input>
                    </div>

                    <div style={{marginLeft: "0.5rem"}}>
                        <label className="TR_text" for="joinDate">DATA DE INSCRIÇÃO MAX</label>
                        <input onChange={(e) => setJoinDate(e.currentTarget.value)} className="TR_input" id="joinDate" type="date"></input>
                    </div>
                </div>
                
                <label className="TR_text" for="prize">PREMIAÇÃO</label>
                <input onChange={(e) => setPrize(e.currentTarget.value)} className="TR_input" id="prize"></input>

                <label className="TR_text" for="capacity">CAPACIDADE</label>
                <input onChange={(e) => setCapacity(e.currentTarget.value)} className="TR_input" id="capacity"></input>

                <label className="TR_text" for="format">FORMATO</label>
                <select onChange={(e) => setFormat(e.currentTarget.value)} className="TR_input" id="format">
                    <option value="1">Round-Robin</option>
                    <option value="2">Single-Elimination</option>
                    Format.map(() => {

                    })
                </select>
            </div>

            <div className="TR_div_button">
                <button className="TR_button">CADASTRAR</button>
            </div>
            </form>
        </div>
    )

}
export default TournamentRegister;