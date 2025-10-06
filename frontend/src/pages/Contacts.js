import { useState, useEffect } from 'react';
import './css/Layaut.css';
import Menu from '../components/Menu';
import './css/Contacts.css';
import Button from '../components/Button';
import AddContact from '../components/AddContact';
import EditContact from '../components/EditContact';

function Contacts({user, setUser}) {

    const [contacts, setContacts] = useState([]);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchContacts = async () => {
        try {
            setLoading(true);
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
                setLoading(false);
            } else {
                console.error("Erreur :", result.error);
                alert(result.error);
                setLoading(false);
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
            alert("Impossible de récupérer les contacts.");
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const editContact = (contact) => {
        setEditingContact(contact);
        setModalEditOpen(true);
    }

    return(
        <div className="layaut conteiner">
            <div className='grid'>
                <Menu user={user} setUser={setUser} />

                <div className='main-conteiner'>
                    <div className='header-conteiner'>
                        <h1>Contacts</h1>

                        <div className='header-actions'>
                            <Button className='btn-primary' onClick={() => setModalAddOpen(true)}>
                                <ion-icon name="add-outline"></ion-icon>
                                <span>New contact</span>
                            </Button>
                        </div>
                    </div>

                    <div className='contacts-list'>
                        {loading ? (
                            <h4>Loading contacts...</h4>
                        ) : (
                            <>
                                {contacts.length === 0 ? (
                                    <>
                                    <h4>No contacts available.</h4>
                                    </>
                                ) : (
                                    <ul className='list'>
                                        {contacts.map((contact, index) => (
                                            
                                            <li className='contact' key={index}>
                                                <div>
                                                    <div className='name'>{contact.firstNameContact} {contact.lastNameContact} </div>
                                                    <div className='number'>{contact.phoneNumberContact}</div>
                                                </div>

                                                <div className='actions'>
                                                    <Button className='icon-action' onClick={() => editContact(contact)}>
                                                        <ion-icon name="pencil-outline"></ion-icon>
                                                    </Button>

                                                    <Button className='icon-action btn-danger' onClick={() => setModalDeleteOpen(true)}>
                                                        <ion-icon name="trash-outline"></ion-icon>
                                                    </Button>
                                                    
                                                </div>
                                            
                                            </li>
                                            
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                       
                    </div>
                </div>
            </div>

            {modalAddOpen && (
                <AddContact onClose={() => setModalAddOpen(false)} modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen} user={user} onContactAdded={fetchContacts}/>
            )}

            { modalEditOpen && (
                <EditContact onClose={() => setModalEditOpen(false)} contactData={editingContact} modalEditOpen={modalEditOpen} setModalEditOpen={setModalEditOpen} user={user} onContactEdited={fetchContacts}/>
            )}
            
            {modalDeleteOpen && (
                <div>Delete Modal</div>
            )}
        </div>
    )
}

export default Contacts;