import './css/Layaut.css';
import Menu from '../components/Menu';


function Profile({user, setUser}) {

    return(
        <div className="layaut conteiner">
            <div className='grid'>
                <Menu user={user} setUser={setUser} />

                <h1>
                    Profile
                </h1>
            </div>
        </div>
    )
}

export default Profile;