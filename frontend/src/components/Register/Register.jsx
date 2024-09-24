import "./Register.css";

function Register() {
  return (
    

    <div className="R_main">
      <div className="sub_main">
        <h1 id="h1_R">Cadastro de usuário</h1>
        <div className="div_R">
          <input className="inputs_R" placeholder="Email"></input>
          <input className="inputs_R" placeholder="Senha"></input>
        </div>
        <div className="div_R2">
            <div className="date">
                <input id="day" type="number" className="inputData" placeholder="Dia"></input>
                <p className="bar">/</p>
                <input type="number" className="inputData" placeholder="Mês"></input>
                <p className="bar">/</p>
                <input type="number" className="inputData" placeholder="Ano"></input>
            </div>
          <input className="inputs_R2" placeholder="Número de telefone"></input>
        </div>
        <div className="div_R">
          <input
            className="inputs_R"
            type="password"
            placeholder="Senha"
          ></input>
          <input
            className="inputs_R"
            type="password"
            placeholder="Confirme sua senha"
          ></input>
        </div>
        <div className="div_button">
          <button id="button_R">CADASTRAR</button>
        </div>
      </div>
    </div>
  );
}
export default Register;
