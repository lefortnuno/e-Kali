import LogInForm from "./login.form";
import "../../assets/styles/auth.css";
import eKali from '../../assets/images/eKali.png'

export default function LogIn() {
  return (
    <div className="bodyArtific">
      <div className="containerContent">
        <h3>Bienvenue!</h3>
        <h1>S'authentifier</h1>
        <LogInForm />
      </div>
      <div className="containerImg">
      <img
        src={eKali}
        alt="bg-eKali"
      /> 
      </div> 
    </div>
  );
}
