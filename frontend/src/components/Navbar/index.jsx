import React, { useEffect, useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

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
            </div>
        </div>
    );
}

export default Navbar;