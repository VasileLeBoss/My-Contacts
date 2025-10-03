import './css/RegisterPage.css';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage({user, setUser}) {

        const [loading, setLoading] = useState(false);
        
        const navigate = useNavigate();
    
        // data form
        const [formData, setFormData] = useState({
            email:'',
            password:''
        })
    
        // ici les erreurs
        const [errors, setErrors] = useState({
            email:'',
            password:''
        });

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

        const validate = (name, value) => {
        switch (name) {
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                if (!value) return "L'email ne peut pas être vide.";
                if (!emailRegex.test(value)) return "Email invalide.";
            return "";
            }
            default:
            return "";

            }
        };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        // les erreurs
        const newErrors = {
            email: validate('email',formData.email),
        }

        setErrors(newErrors);


        // si on a des erreur on desactive le button
        if (Object.values(newErrors).some(e => e !== '')) {
            setLoading(false);
            return;
        }

        try {
            
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials:'omit'
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.field && data.error) {
                    setErrors(prev => ({ ...prev, password: data.error }));
                } else {
                    setErrors(prev => ({ ...prev, password: data.error || 'Erreur inconnue' }));
                }
                setFormData(prev => ({ ...prev, password: '' }));
            } else {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token );
                setUser(data.user);
                navigate('/contacts', { replace: true });
            }

        } catch (error) {
            setErrors(prev => ({ ...prev, login: "Erreur réseau. Réessaie plus tard." }));
        } finally{
            setLoading(false)
        }

    }

    const isDisabled =
        Object.values(errors).some(err => err !== '') ||
        Object.values(formData).some(val => val.trim() === '');


    return(
        <div className="register-page conteiner">
            <div className='header'>
                <h1>Content de vous revoir</h1>
                <p>Centralisez et retrouvez facilement tous vos contacts, 
                    que ce soit pour le travail ou le perso, au même endroit.
                </p>
            </div>
            <form onSubmit={handleSubmit} className='form'>
                <div className="content">
                    <Input type="email" onChange={handleChange} name="email" value={formData.email} label="Email" placeholder="Votre email" required autoFocus error={errors.email} />
                    <Input type="password" onChange={handleChange} name="password" value={formData.password} label="Mot de passe" placeholder="Mot de passe" required error={errors.password} />
                </div>
                
                <SubmitButton label="Se connecter" loading={loading} disabled={ loading || isDisabled}/>
            </form>
            <div className='footer'>
                <p><span>Vous avez pas un compte ?</span><Link to="/register">S'inscrire</Link> </p>
            </div>
        
        </div>
    )
}

export default LoginPage;