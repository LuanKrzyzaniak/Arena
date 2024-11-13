import "./style.css";
import Navbar from "../../components/Navbar";

import axios from '../../axiosConfig'

import React, {useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";  

function TournamentRegister() {


    const [Name, setName] = React.useState("");
    const [TournamentDate, setTournamentDate] = React.useState("");
    const [JoinDate, setJoinDate] = React.useState("");
    const [Prize, setPrize] = React.useState("");
    const [Capacity, setCapacity] = React.useState("");
    const [Format, setFormat] = React.useState("");
    const [Sport, setSport] = React.useState("");

    const [formatList, setFormatList] = React.useState([]);
    const [sportList, setSportList] = React.useState([]);


    const navigate = useNavigate();

    useEffect(()=>{
        getFormat();
    },[])

    async function getFormat(){
        try {
            const res = await axios.get("/tournament/formats");
            const aux = res.data.data;
            setFormatList(aux);

            const resSport = await axios.get("/tournament/sports");
            const auxSport = resSport.data.data;
            setSportList(auxSport.rows);

        } catch (error) {
            
        }
    }

    async function submitTournament() {

        try {
            const res = await axios.post("/tournament/create", {Name, JoinDate, TournamentDate, Prize, Format, Capacity,Sport});
            if(res.status === 200){
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
            <form method="post" onSubmit={(e)=>{
                e.preventDefault();
                submitTournament();
            }}>
                
            <div className="TR_div_form">
                <label className="TR_text" for="name">NOME</label>
                <input onChange={(e) => setName(e.currentTarget.value)} className="TR_input" id="name"></input>

                <div className="TR_div_dates">
                    <div style={{marginRight: "0.5rem"}}>
                        <label className="TR_text" for="tournamentDate">DATA DO TORNEIO</label>
                        <input onChange={(e) => setTournamentDate(e.currentTarget.value)} className="TR_input" id="tournamentDate" type="date"></input>
                    </div>

                </div>
                
                <label className="TR_text" for="sport">sport</label>
                <select  onChange={(e) => setSport(e.target.value)} className="TR_input" id="sport">
                    <option value={""}>SELECIONE UM E-SPORTE</option>
                    {
                        sportList.map((i) => {
                            return(
                                
                                <option key={i.id}value={i.id}>{i.sportname}</option>
                            )
                        })
                    }
                </select>

                <label className="TR_text" for="format">FORMATO</label>
                <select  onChange={(e) => setFormat(e.target.value)} className="TR_input" id="format">
                    <option value={""}>SELECIONE UM FORMATO</option>
                    {
                    formatList.map((i) => {
                        return(
                            <option key={i.id} value={i.id}>{i.formatname}</option>
                        )
                    })
                    }


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