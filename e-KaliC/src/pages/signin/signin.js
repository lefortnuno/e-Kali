import SignInForm from "./signin.form";
import "../../assets/styles/auth.css";
import "./signin.css";
import eKali from '../../assets/images/eKali.png'

export default function SignIn() {
  return (
    <div className="bodyArtific">
      <div className="containerContent">
        <h3>Bienvenue!</h3>
        <h1>S'enregistrer</h1>
        <SignInForm />
      </div>
      <div className="containerImg">
        <img
          src={eKali}
          alt="logo-eKali"
        />
      </div> 
    </div>
  );
}
