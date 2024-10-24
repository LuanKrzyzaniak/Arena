import React, { useEffect, useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import logo from "../../assets/logo_def.png";
import "./style.css";

function Navbar() {
    const [menubarState, setMenubarState] = useState("hide");

    useEffect(() => {
        if (menubarState === "show") {
            document.querySelector(".Navbar .menubar").classList.add("active");
        }
        else if (menubarState === "hide") {
            document.querySelector(".Navbar .menubar").classList.remove("active");
        }
    }, [menubarState]);

    return (
        <div className="Navbar" >
            <nav className="top">
                <span className="menu-icon" onClick={() => setMenubarState("show")}>
                    <IoMenu />
                </span>

                <span className="profile-icon">
                    <FaUser />
                </span>
            </nav>

            <div className="menubar">
                <header className="header">
                    <span className="close-icon" onClick={() => setMenubarState("hide")}>
                        <IoClose />
                    </span>
                </header>

                <div className='inside_logo'>
                    <img src={logo} alt="Logo" />
                </div>

                <a href="#">
                    <div className='inside_text'>
                        <div className='org_icon'>        
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill icon" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                            </svg>
                            <p>Página Inicial</p>
                        </div>    
                    </div>
                </a>

                <div className='line_sidebar'></div>

                <a href="#">
                    <div className='inside_text'>
                        <div className='org_icon'>        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill icon" viewBox="0 0 16 16">
                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
                        </svg>
                            <p>Torneios</p>
                        </div>    
                    </div>
                </a>

                <div className='line_sidebar'></div>

                <a href="#">
                    <div className='inside_text'>
                        <div className='org_icon'>        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill icon" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        </svg>
                            <p>Organização</p>
                        </div>    
                    </div>
                </a>

                <div className='line_sidebar'></div>
                
                <a href="#">
                    <div className='inside_text'>
                        <div className='org_icon'>        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill icon" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                        </svg>
                            <p>Configurações</p>
                        </div>    
                    </div>
                </a>


            </div>
        </div>
    );
}

export default Navbar;