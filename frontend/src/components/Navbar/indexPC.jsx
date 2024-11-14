import logo from "../../assets/logo_def.png";
import { Link } from 'react-router-dom';
import "./style.css";


function Navbar(){
    return(
        <>
        <section className="navbar_home">

                <div className='logo_home'>
                    <img src={logo} alt="Logo" />
                </div>

                    <div className='text_nav fix'>
                        <Link className="bold_text" to={"/"}> PÁGINA INICIAL</Link>
                    </div>
                
                <div className='line_sidebar_home'></div>
                
                    <div className='text_nav'>
                        <p className="bold_text" >TORNEIOS</p>
                    </div>
                

                <div className='line_sidebar_home'></div>

                    <div className='text_nav fix'>
                        <Link className="bold_text" to={"/organization"}> ORGANIZAÇÕES</Link>
                    </div>

                <div className='line_sidebar_home'></div>
                
                    <div className='text_nav'>
                    <p className="bold_text" >CONFIGURAÇÕES</p>
                    </div>
        </section>
        </>
    )
}

export default Navbar