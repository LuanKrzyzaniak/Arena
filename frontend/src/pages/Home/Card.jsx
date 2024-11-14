import React from "react"

import { FaRegCalendar } from "react-icons/fa"
import { FaRegClock } from "react-icons/fa"
import { FaUserFriends } from "react-icons/fa"
import { MdOutlineVideogameAsset } from "react-icons/md"

import cardbanner from "../../assets/car1.png"

import "./card.css"

const Card = (props) => {

    const date = props.tournament.startDate.split("T")
    const calendar = date[0]
    const clock = date[1]
    const [year, month, day] = calendar.split("-")
    const [hour, minute] = clock.split(":")

    return (
        <div className="Card">
            <div className="banner">
                <img src={cardbanner} alt="" />
            </div>
            <div className="info">
                <h3>{props.tournament.name}</h3>
                <div className="grid">
                    <div className="date">
                        <FaRegCalendar />
                        <p>{day}/{month}/{year}</p>
                    </div>
                    <div className="competitors">
                        <FaUserFriends />
                        <p>{props.tournament.competitors.length}/16</p>
                    </div>
                    <div className="hour">
                        <FaRegClock />
                        <p>{hour}:{minute} GMT</p>

                    </div>
                    <div className="sport">
                        <MdOutlineVideogameAsset />
                        <p>{props.tournament.sport}</p>
                    </div>
                </div>
            </div>
            <button>Join</button>
        </div>
    )
}

export default Card