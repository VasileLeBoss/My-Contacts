import './css/RegisterPage.css';
import '../index.css';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage({ setUser }) {

    const [loading, setLoading] = useState(false);
    
    

    // data form
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        password:'',
        confirmPassword:'',
    })

    // ici les erreurs
    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        password:'',
        confirmPassword:'',
    });

    const validate = (name, value) => {
        switch (name) {
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                if (!value) return "L'email ne peut pas être vide.";
                if (!emailRegex.test(value)) return "Email invalide.";
            return "";
            }

            case 'firstName': {
                const firstNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
                if (!value) return "Le prénom ne peut pas être vide.";
                if (!firstNameRegex.test(value)) return "Prénom invalide.";
                if (value.length < 2) return "Le prénom est trop court.";
                if (value.length > 40) return "Le prénom est trop long.";
            return "";
            }

            case 'lastName': {
                const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
                if (!value) return "Le nom ne peut pas être vide.";
                if (!lastNameRegex.test(value)) return "Nom invalide.";
                if (value.length < 3) return "Le nom est trop court.";
                if (value.length > 40) return "Le nom est trop long.";
            return "";
            }

            case 'phoneNumber': {
                const phoneRegex = /^[0-9]{8,15}$/;
                if (!value) return "Le numéro de téléphone ne peut pas être vide.";
                if (!phoneRegex.test(value)) return "Numéro de téléphone invalide.";
            return "";
            }

            case 'password': {
                if (!value) return "Le mot de passe ne peut pas être vide.";
                if (value.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
                if (!/[A-Z]/.test(value)) return "Le mot de passe doit contenir une majuscule.";
                if (!/[0-9]/.test(value)) return "Le mot de passe doit contenir un chiffre.";
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Le mot de passe doit contenir un caractère spécial.";
            return "";
            }

            case 'confirmPassword': {
                if (!value) return "La confirmation du mot de passe est requise.";
                if (value !== formData.password) return "Les mots de passe ne correspondent pas.";
            return "";
            }

            default:
            return "";

            }
        };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validation locale
        const validationError = validate(name, value);

        setErrors(prev => ({
            ...prev,
            [name]: validationError
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        // les erreurs
        const newErrors = {
            firstName: validate('firstName',formData.firstName),
            lastName: validate('lastName',formData.lastName),
            email: validate('email',formData.email),
            phoneNumber: validate('phoneNumber',formData.phoneNumber),
            password: validate('password',formData.password),
            confirmPassword: validate('confirmPassword',formData.confirmPassword),
        }
        setErrors(newErrors);


        // si on a des erreur on desactive le button
        if (Object.values(newErrors).some(e => e !== '')) {
            setLoading(false);
            return;
        }

        alert('data send here');

    }

    // si on a des erreur
    const isDisabled =
    Object.values(errors).some(err => err !== '') ||
    Object.values(formData).some(val => val.trim() === '');

    return(
        <div className="register-page conteiner">
            <div className='header'>
                <h1>Créez votre compte</h1>
                <p>
                    Rejoignez-nous dès aujourd'hui et commencez à gérer vos contacts plus 
                    simplement que jamais.
                </p>
            </div>
            <form onSubmit={handleSubmit} className='form'>
            <div className="content">
                
                <Input type="text" onChange={handleChange} name="firstName" value={formData.firstName} label="Prénom" placeholder="Votre prénom" required error={errors.firstName} />
                <Input type="text" onChange={handleChange}  name="lastName" value={formData.lastName} label="Nom" placeholder="Votre nom" required error={errors.lastName} />
                <Input type="email" onChange={handleChange} name="email" value={formData.email} label="Email" placeholder="Votre email" required autoFocus error={errors.email} />
                <Input type="tel" onChange={handleChange}  name="phoneNumber" value={formData.phoneNumber} label="Numéro de téléphone" placeholder="Votre numéro de téléphone" required error={errors.phoneNumber} />
                <Input type="password" onChange={handleChange} name="password" value={formData.password} label="Mot de passe" placeholder="Mot de passe" required error={errors.password} />
                <Input type="password" onChange={handleChange}  name="confirmPassword" value={formData.confirmPassword} label="Confirmez le mot de passe" placeholder="Répétez votre mot de passe" required error={errors.confirmPassword} />
            </div>
            <SubmitButton label="S'inscrire" loading={loading} disabled={ loading || isDisabled}/>
            </form>
            <div className='footer'>
                <p><span>Vous avez déjà un compte ?</span><Link to="/login">Se connecter</Link> </p>
            </div>
        </div>
    )
}

export default RegisterPage;