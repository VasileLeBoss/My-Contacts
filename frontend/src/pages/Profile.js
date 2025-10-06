import './css/Layaut.css';
import './css/Profile.css';
import Menu from '../components/Menu';
import Input from '../components/Input';


function Profile({user, setUser}) {

    return(
        <div className="layaut conteiner">
            <div className='grid'>
                <Menu user={user} setUser={setUser} />

                <div className='main-conteiner'>
                    <div className='header-conteiner'>
                        <h1>Profil</h1>
                    </div>

                    <div className='profile-conteiner'>
                        <div className='double-inputs'>
                            <Input label="Nom" type="text" name="firstName" value={user.firstName} disabled={true} readOnly={true} />
                            <Input label="Prénom" type="text" name="lastName" value={user.lastName} disabled={true} readOnly={true} />
                        </div>
                        <Input label="Email" type="email" name="email" value={user.email} disabled={true} />   
                        <Input label="Numéro de téléphone" type="text" name="phoneNumber" value={user.phoneNumber} disabled={true} readOnly={true} />

                        <div className='info'>
                            <p>Les informations affichées ici ne sont pas modifiables :) </p>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}

export default Profile;