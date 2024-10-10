import React from "react";
import "./style.css";

import logo from "../../assets/logo_def.png";

// import { Carousel } from "react-bootstrap";

import Navbar from "../../components/Navbar";

function Home() {
	return (
		<>
			<section className="Home-navbar">
				<Navbar />
			</section>
			<section className="Home-welcome">
				<h1>Welcome to</h1>
				<img src={logo} alt="Logo" />
			</section>
			<section className="Home-selectgame">
				<h2>Escolha o jogo, <span id="username">undefined</span>:</h2>
				{/* <Carousel className="Home-carousel">
					<Carousel.Item>
						<img src={lollogo} alt="League of Legends logo" />
					</Carousel.Item>
					<Carousel.Item>
						<img src={dotalogo} alt="Dota 2 logo" />
					</Carousel.Item>
					<Carousel.Item>
						<img src={cslogo} alt="Counter Strike logo" />
					</Carousel.Item>
				</Carousel> */}
			</section>
		</>
	)
}
export default Home;