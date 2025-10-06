import Button from './Button';
import './css/Modal.css'
import SubmitButton from './SubmitButton';

function DeleteContact({ onClose, contactData, modalDeleteOpen, setModalDeleteOpen, loading = false, isDisabled = false, user, onContactDeleted }) {


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const res = await fetch(`/api/contact/delete/${contactData._id}`, {
                method: 'DELETE',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                 },
                body: JSON.stringify({
                    userId: user.id,
                    ...contactData
                })
            });

            const result = await res.json();

            if (res.ok) {
                setModalDeleteOpen(false);
                if (onContactDeleted) {
                    onContactDeleted();
                }
            } else {
                console.error("Erreur :", result.error);
                alert(result.error);
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
            alert("Impossible de supprimer le contact.");
        }
    };


    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Supprimer le contact</h2>
                    <span className='close' onClick={onClose}>
                        <ion-icon name="close-outline"></ion-icon>
                    </span>
                </div>
                <div className='modal-body'>
                        <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
                        <h4>{contactData.firstNameContact} {contactData.lastNameContact} - {contactData.phoneNumberContact}</h4>

                        <div className='form-actions-delete'>
                            <Button className='btn-secondary' onClick={onClose}>
                                <span>Annuler</span>
                            </Button>
                            <SubmitButton className='button-danger' onClick={onSubmit} label="Supprimer" loading={loading} disabled={ loading || isDisabled} />
                        </div>
                </div>
            </div>
        </div>    
    )
}

export default DeleteContact;