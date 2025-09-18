import './css/SubmitButton.css'

function SubmitButton({label, onClick, loading}) {
    return(
        <div className="button-conteiner">
            <button className='button-submit' onClick={onClick} disabled={loading}>
                {label}
            </button>
        </div>
    )
}

export default SubmitButton;