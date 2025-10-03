import { useState, useEffect } from 'react';
import './css/Layaut.css';
import Menu from '../components/Menu';
import './css/Contacts.css';
import Button from '../components/Button';
import AddContact from '../components/AddContact';

function Contacts({user, setUser}) {

    const [contacts, setContacts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/contact/all/${user.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const result = await res.json();
            if (res.ok) {
                setContacts(result.contacts);
            } else {
                console.error("Erreur :", result.error);
                alert(result.error);
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
            alert("Impossible de récupérer les contacts.");
        }
    };

    useEffect(() => {
        if (user.id) {
            fetchContacts();
        }
    }, [user.id]);

    return(
        <div className="layaut conteiner">
            <div className='grid'>
                <Menu user={user} setUser={setUser} />

                <div className='main-conteiner'>
                    <div className='header-conteiner'>
                        <h1>Contacts</h1>

                        <div className='header-actions'>
                            <Button className='btn-primary' onClick={() => setModalOpen(true)}>
                                <ion-icon name="add-outline"></ion-icon>
                                <span>New contact</span>
                            </Button>
                        </div>
                    </div>

                    <div className='contacts-list'>
                        {contacts.length === 0 ? (
                            <>
                            <h4>No contacts available.</h4>
                            </>
                        ) : (
                            <ul>
                                {contacts.map((contact, index) => (
                                    <li key={index}>
                                        {contact.firstNameContact} {contact.lastNameContact} - {contact.phoneNumberContact}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <AddContact onClose={() => setModalOpen(false)} modalOpen={modalOpen} setModalOpen={setModalOpen} user={user} onContactAdded={fetchContacts}/>
            )}
        </div>
    )
}

export default Contacts;