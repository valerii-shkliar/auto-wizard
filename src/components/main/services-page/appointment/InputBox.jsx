import style from './Appointment.module.scss';
const { inputContainer, appointmentEnter, appointmentLabel } = style;

function InputBox({ type = 'text', name, content, required, value, onChange }) {
  return (
    <div className={inputContainer}>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={content}
        required={required}
        className={appointmentEnter}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className={appointmentLabel}>
        {content}
      </label>
    </div>
  );
}

export default InputBox;
