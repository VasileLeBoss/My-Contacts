import './css/RegisterPage.css';
import '../index.css';
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton';
import { Link } from 'react-router-dom';

function RegisterPage({user, setUser}) {
    return(
        <div className="register-page conteiner">
            <div className='header'>
                <h1>Créez votre compte</h1>
                <p>
                    Rejoignez-nous dès aujourd'hui et commencez à gérer vos contacts plus 
                    simplement que jamais.
                </p>
            </div>
            <div className="content">
                <Input type="text" name="firstName" value="" label="Prénom" placeholder="Votre prénom" required error="" />
                <Input type="text" name="lastName" value="" label="Nom" placeholder="Votre nom" required error="" />
                <Input type="email" name="email" value="" label="Email" placeholder="Votre email" required autoFocus error="" />
                <Input type="tel" name="phoneNumber" value="" label="Numéro de téléphone" placeholder="Votre numéro de téléphone" required error="" />
                <Input type="password" name="password" value="" label="Mot de passe" placeholder="Mot de passe" required error="" />
                <Input type="password" name="confirmPassword" value="" label="Confirmez le mot de passe" placeholder="Répétez votre mot de passe" required error="" />
            </div>
            <SubmitButton label="S'inscrire"/>
            <div className='footer'>
                <p><span>Vous avez déjà un compte ?</span><Link to="/login">Se connecter</Link> </p>
            </div>
        </div>
    )
}

export default RegisterPage;