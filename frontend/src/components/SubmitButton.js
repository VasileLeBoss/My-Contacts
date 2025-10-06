import './css/SubmitButton.css'

function SubmitButton({label, onClick, disabled, loading, className="" }) {
    return(
        <div className="button-conteiner">
            <button  className={`button-submit ${className}`} onClick={onClick} disabled={disabled}>
                {loading ? (
                    <div><span className="spinner"></span><span>Chargement...</span></div>
                ): (
                    <span>{label}</span>
                )}
            </button>
        </div>
    )
}

export default SubmitButton;