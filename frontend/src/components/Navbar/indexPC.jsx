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

                    
                        <div className='text_nav'>
                           <Link className="text_nav" to={"/"}> Pagina inicial</Link>
                        </div>
                    

                    <div className='line_sidebar_home'></div>

                    
                        <div className='text_nav'>
                        <Link className="link" to={"/organization"}> Torneios</Link>
                        </div>
                    

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