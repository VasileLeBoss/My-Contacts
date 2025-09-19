import { useState } from 'react';
import './css/Layaut.css';
import Menu from '../components/Menu';


function Contacts({user, setUser}) {

    return(
        <div className="layaut conteiner">
            <div className='grid'>
                <Menu user={user} setUser={setUser} />

                <h1>
                    Contacts
                </h1>
            </div>
        </div>
    )
}

export default Contacts;