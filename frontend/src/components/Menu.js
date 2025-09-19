import './css/Menu.css'

import { NavLink , useNavigate } from "react-router-dom";



function Menu({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login', { replace: true });
    };

    return(
        <menu>
            <div className="header-menu">
                <ion-icon name="person-circle-outline"></ion-icon>
                
                <div className='user-details'>
                    <div className='user-name'><span>{user.firstName} {user.lastName}</span></div>
                    <span className='user-email'>{user.email}</span>
                </div>

            </div>

            <div className='content-menu'>

                <h4>Menu</h4>

                <NavLink to='/contacts' className={({ isActive }) => isActive ? 'active-link' : '' } >
                    <ion-icon name="list-outline"></ion-icon>
                    <span>Contacts</span>
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : '' }>
                    <ion-icon name="person-outline"></ion-icon>
                    <span>My Profile</span>
                </NavLink>
            </div>

            <NavLink to="/login" onClick={handleLogout} className='footer-menu'>
                <ion-icon name="log-out-outline"></ion-icon>
                <span>Logout</span>
            </NavLink>
        </menu>
    )

}


export default Menu;