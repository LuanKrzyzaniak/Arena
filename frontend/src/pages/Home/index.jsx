import React, { useEffect } from "react";
import "./style.css";

import logo from "../../assets/logo_def.png";

import lol_logo from "../../assets/league-of-legends-seeklogo.png"
import dota_logo from "../../assets/dota-2-seeklogo.png"

import { Carousel, CarouselItem } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import FormSubmitButton from "../../components/FormSubmitButton";

function Home() {

	useEffect(() => {
		
	}, [])

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
				<Carousel className="Home-carousel" interval={5000} indicators={false}>
					<CarouselItem>
						<div className="Home-carousel-item">
							<img src={lol_logo} alt="" />
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="Home-carousel-item">
							<img src={dota_logo} alt="" />
						</div>
					</CarouselItem>
				</Carousel>

				<FormSubmitButton content="Selecionar" />
			</section>
		</>
	)
}
export default Home;