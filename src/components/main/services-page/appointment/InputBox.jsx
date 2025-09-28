import style from './Appointment.module.scss';

const { inputContainer, appointmentEnter, appointmentLabel, inputError } = style;

function InputBox({ type = 'text', name, content, value, onChange, children, onBlur }) {
  return (
    <div className={inputContainer}>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={content}
        className={appointmentEnter}
        value={value}
        onChange={onChange}
        autoComplete="on"
        onBlur={onBlur}
      />
      <label htmlFor={name} className={appointmentLabel}>
        {content}
      </label>
      {<span className={inputError}>{children}</span>}
    </div>
  );
}

export default InputBox;
