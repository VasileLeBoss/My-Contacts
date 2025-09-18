import './css/RegisterPage.css';
import '../index.css';
import Input from '../components/Input'

function LoginPage({user, setUser}) {
    return(
        <div className="login-page conteiner">
            <div className='header'>
                <h1>Content de vous revoir</h1>
                <p>Centralisez et retrouvez facilement tous vos contacts, 
                    que ce soit pour le travail ou le perso, au même endroit.
                </p>
            </div>
            <Input type="text" name="firstName" value="" label="Prénom" placeholder="Votre prénom" required error="" />

        </div>
    )
}

export default LoginPage;