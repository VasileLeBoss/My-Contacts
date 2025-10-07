import './css/Modal.css'
import Input from './Input';
import SubmitButton from './SubmitButton';

function EditContact({ onClose, contactData, setEditingContact, modalEditOpen, setModalEditOpen, loading = false, isDisabled = false, user, onContactEdited }) {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');

            const res = await fetch(`/api/contact/edit/${contactData._id}`, {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                 },
                body: JSON.stringify({
                    userId: user.id,
                    ...data
                })
            });

            const result = await res.json();

            if (res.ok) {
                setModalEditOpen(false);
                if (onContactEdited) {
                    onContactEdited();
                }
            } else {
                console.error("Erreur :", result.error);
                alert(result.error);
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
            alert("Impossible de modifier le contact.");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setEditingContact((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Modifier le contact</h2>
                    <span className='close' onClick={onClose}>
                        <ion-icon name="close-outline"></ion-icon>
                    </span>
                </div>
                <div className='modal-body'>
                    <form onSubmit={onSubmit}>
                        <Input onChange={onChange} label="First Name" type="text" name="firstNameContact" placeholder="Enter first name" value={contactData.firstNameContact} />
                        <Input onChange={onChange} label="Last Name" type="text" name="lastNameContact" placeholder="Enter last name" value={contactData.lastNameContact} />
                        <Input onChange={onChange} label="Phone Number" type="number" name="phoneNumberContact" placeholder="Enter phone number" value={contactData.phoneNumberContact} />
                        <div className='form-actions'>
                            <SubmitButton label="Enregistrer" loading={loading} disabled={ loading || isDisabled} />
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    )
}

export default EditContact;