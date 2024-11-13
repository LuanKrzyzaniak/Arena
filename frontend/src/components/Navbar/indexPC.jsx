import logo from "../../assets/logo_def.png";
import "./style.css";


function Navbar(){
    return(
        <>
        <section className="navbar_home">

                <div className='logo_home'>
                        <img src={logo} alt="Logo" />
                    </div>

                    <a href="#">
                        <div className='text_nav'>
                            <p className="bold_text">PÁGINA INICIAL</p>
                        </div>
                    </a>

                    <div className='line_sidebar_home'></div>

                    <a href="#">
                        <div className='text_nav'>
                            <p className="bold_text" >TORNEIOS</p>
                        </div>
                    </a>

                    <div className='line_sidebar_home'></div>

                    <a href="#">
                        <div className='text_nav'>
                        <p className="bold_text" >ORGANIZAÇÃO</p>
                        </div>
                    </a>

                    <div className='line_sidebar_home'></div>
                    
                    <a href="#">
                        <div className='text_nav'>
                        <p className="bold_text" >CONFIGURAÇÕES</p>
                        </div>
                    </a>
        </section>
        </>
    )
}

export default Navbar