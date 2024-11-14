import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../../index"

import "./style.css"

import backgroundImg from "../../assets/img_login.png"

const Login = () => {
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        const login = e.target.elements[0].value
        const password = e.target.elements[1].value
        const infoType = login.includes("@") ? "email" : "username"

        const errorElement = document.querySelector("#error")

        const response = await api.post("/player/login", {
            login,
            password,
            infoType
        }, {
            withCredentials: true,
        })
        
        if(response.data.statusCode !== 111) {
            errorElement.innerHTML = response.data.error
            errorElement.classList.add("active")
            setTimeout(() => {
                errorElement.classList.remove("active")
            }, 3000)
        }
        else {
            navigate("/")
        }
    }

    return (
        <div className="Home">
            <div className="form">
                <h1>Login</h1>
                <form method="POST" onSubmit={(e) => handleLogin(e)}>
                    <input type="text" name="loginInput" id="homeLoginInput" placeholder="Username or email" />
                    <div className="group" id="passGroup">
                        <input type="password" name="passwordInput" id="homePasswordInput" placeholder="Password" />
                        <small>
                            <a href="/forgotpass">Forgot my password</a>
                        </small>
                    </div>
                    <small id="error"></small>
                    <div className="group">
                        <button>Login</button>
                        <small>
                            <a href="/register">Create an account</a>
                        </small>
                    </div>
                </form>
            </div>
            <div className="image">
                <img src={backgroundImg} alt="" />
            </div>
        </div>
    )
}

export default Login