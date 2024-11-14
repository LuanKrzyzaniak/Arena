import React, { useEffect } from "react";
import "./style.css";

import logo from "../../assets/logo_def.png";
import carrousel1 from "../../assets/car1.png"
import carrousel2 from "../../assets/car2.png"
import carrousel3 from "../../assets/car3.png"

import NavbarPC from "../../components/Navbar/indexPC"
import Navbar from "../../components/Navbar";

import lol from "../../assets/lol_png.png"
import valorant from "../../assets/valorant_logo.png"
import cs from "../../assets/cs_logo.png"



import dota_logo from "../../assets/dota-2-seeklogo.png"

import { Carousel, CarouselItem } from "react-bootstrap";

import FormSubmitButton from "../../components/FormSubmitButton";

function Home() {
    
	useEffect(() => {
		
	}, [])


	return (
		<div className="homePC"> 
            
            <NavbarPC/>

            <div className="carousels">
                
                <section className="content_right">

                    <div className="carrousel">
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={carrousel1} class="d-block w-100" alt="..."></img>
                                </div>
                                <div class="carousel-item">
                                <img src={carrousel2} class="d-block w-100" alt="..."></img>
                                </div>
                                <div class="carousel-item">
                                    <img src={carrousel3} class="d-block w-100" alt="..."></img>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="car_below">
                    <div className="subtitle_tounrment">
                        <h2>Jogos Disponíveis</h2>
                    </div>
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div className="item_car">
                                    <div className="game_card">
                                        <img src={lol} alt="" />
                                    </div>
                                    <div className="game_card">
                                        <img src={valorant} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div className="item_car">
                                        <div className="game_card">
                                            <img src={cs} alt="" />
                                        </div>
                                        <div className="game_card">
                                            <img src={lol} alt="" />
                                        </div>
                                </div>                            
                            </div>
                            <div class="carousel-item">
                                <div className="item_car">
                                    <div className="game_card">
                                        <img src={valorant} alt="" />
                                    </div>
                                    <div className="game_card">
                                            <img src={cs} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>
        </div>

    </div>
	)
}
export default Home;