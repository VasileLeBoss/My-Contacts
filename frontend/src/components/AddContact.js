import './css/Modal.css'
import Input from './Input';
import SubmitButton from './SubmitButton';

function AddContact({ onClose, modalOpen, setModalAddOpen, loading = false, isDisabled = false, user, onContactAdded }) {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {

            const token = localStorage.getItem('token');

            const res = await fetch('/api/contact/add', {
                method: 'POST',
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
                setModalAddOpen(false);
                if (onContactAdded) {
                    onContactAdded();
                }
            } else {
                console.error("Erreur :", result.error);
                alert(result.error);
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
            alert("Impossible d'ajouter le contact.");
        }
    };


    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Nouveau contact</h2>
                    <span className='close' onClick={onClose}>
                        <ion-icon name="close-outline"></ion-icon>
                    </span>
                </div>
                <div className='modal-body'>
                    <form onSubmit={onSubmit}>
                        <Input label="Nom" type="text" name="firstNameContact" placeholder="Entrez le nom" autoFocus={true} />
                        <Input label="Prenom" type="text" name="lastNameContact" placeholder="Entrez le prénom" />
                        <Input label="Numéro téléphone" type="number" name="phoneNumberContact" placeholder="Entrez le numéro de téléphone" />
                        <div className='form-actions'>
                            <SubmitButton label="Ajouter le contact" loading={loading} disabled={ loading || isDisabled} />
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    )
}

export default AddContact;