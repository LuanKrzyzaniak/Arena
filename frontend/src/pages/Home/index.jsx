import React, { useEffect, useState } from "react"
import axios from "../../index"

import { IoMenu } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { MdClose } from "react-icons/md"

import "./style.css"

import logo from "../../assets/logo_def.png"
import dotalogo from "../../assets/dota-2-seeklogo.png"
import lollogo from "../../assets/league-of-legends-logo-vector-30.jpeg"
import cslogo from "../../assets/cs2logo.png"

import Card from "./Card"

const Home = () => {

    const [tournaments, setTournaments] = useState([])
    const [user, setUser] = useState("null")

    useEffect(() => {
        async function load() {
            let response = await axios.get("/tournament/all", {
                withCredentials: true
            })

            if (response.data.statusCode === 222) {
                setTournaments(response.data.tournaments)
            }

            response = await axios.get("/player/", {
                withCredentials: true
            })

            if(response.data.statusCode === 222) {
                setUser(response.data.player)
            }
        }

        load()
    }, [])

    return (
        <div className="Home">
            <nav>
                <IoMenu />
                <FaUserCircle />
            </nav>
            <div className="welcome">
                <h1>Welcome to</h1>
                <img src={logo} alt="" />
            </div>
            <div className="advertisement">
                <MdClose />
                <p>To compete in Arena you need to be member of an organization!</p>
                <h3>Be member or create your own!</h3>
                <div className="buttons">
                    <button>View orgs</button>
                    <p>or</p>
                    <button>Create my own</button>
                </div>
            </div>
            <div className="filter">
                <h2>Choose the game, {user.username}:</h2>
                <div className="games">
                    <button>
                        <img src={dotalogo} alt="" />
                    </button>
                    <button>
                        <img src={lollogo} alt="" />
                    </button>
                    <button>
                        <img src={cslogo} alt="" />
                    </button>
                </div>
                <button className="btnFilter">Filter</button>
            </div>
            <div className="tournaments">
                {tournaments.map((tournament) => {
                    return (<Card tournament={tournament} key={tournament.tid} />)
                })}
                {/* <div className="card">
                    <div className="banner">
                        <img src={cardbanner} alt="" />
                    </div>
                    <div className="info">
                        <h3>Torneio de Dota 2 muito foda</h3>
                        <div className="grid">
                            <div className="date">
                                <FaRegCalendar />
                                <p>11/14/2024, Thursday</p>
                            </div>
                            <div className="competitors">
                                <FaUserFriends />
                                <p>10/16</p>
                            </div>
                            <div className="hour">
                                <FaRegClock />
                                <p>03:00 PM  GMT-03</p>

                            </div>
                            <div className="sport">
                                <MdOutlineVideogameAsset />
                                <p>Dota 2</p>
                            </div>
                        </div>
                    </div>
                    <button>Participar</button>
                </div> */}
            </div>
        </div>
    )
}

export default Home