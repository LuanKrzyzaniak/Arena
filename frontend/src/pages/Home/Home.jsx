import React from "react";
import { FaTrophy } from "react-icons/fa";

import "./index.css";

function Home() {
	return (
		<>
			{/* Navbar */}
			<section className="Home-tournments">
				<h1><i>Torneios</i></h1>
				<div className="Home-tournments-cards">
					<div className="Home-tournments-cards-card">
						<span><FaTrophy /></span>
						<p>Torneio 1</p>
					</div>
					<div className="Home-tournments-cards-card">
						<span><FaTrophy /></span>
						<p>Torneio 2</p>
					</div>
					<div className="Home-tournments-cards-card">
						<span><FaTrophy /></span>
						<p>Torneio 3</p>
					</div>
				</div >
			</section >
		</>
	)
}
export default Home;