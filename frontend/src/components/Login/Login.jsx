import "./Login.css"
import logo from "../../assets/logo.png" 
function Login() {
  return (
    <div class="mainClass" >
      <div class="loginDiv">
        <img id="logo" src={logo} alt="Logo arena"></img>
      </div>
      
      <div class="loginDiv">
        <input class='inputs'type='text' placeholder='Email'></input>
        <input class='inputs'type='password' placeholder='Senha'></input>
        <h1 >Esqueci minha senha</h1>
        <button id='button'>ENTRAR</button>
        <button id='forgot'>Esqueci minha senha</button>
      </div>
    </div>
    
    
  );
}
export default Login;
