import './css/Input.css';

function Input({
  type,
  name,
  value,
  onChange,
  onBlur,
  label,
  labelIcon,
  placeholder,
  required = false,
  autoFocus = false,
  aditionalInfo,
  error = ""
}) {
  return (
    <div className="input-container">
      <label htmlFor={name} className={labelIcon ? 'with-icon' : ''}>
        {labelIcon && <ion-icon name={`${labelIcon}`}></ion-icon>}
        {label} {required && '*'}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        aria-describedby={`${name}-info ${error ? `${name}-error` : ''}`}
        aria-invalid={!!error}
      />

      {error && <span className="error-message" id={`${name}-error`}>{error}</span>}
      {aditionalInfo && <div className="aditional-info" id={`${name}-info`}>{aditionalInfo}</div>}
    </div>
  );
}


export default Input;
