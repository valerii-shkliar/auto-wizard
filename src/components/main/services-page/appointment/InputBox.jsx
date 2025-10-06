import { ErrorMessage, Field } from 'formik';
import style from './Appointment.module.scss';

const { inputContainer, appointmentEnter, appointmentLabel, inputError, appointmentEnterComment } =
  style;

function InputBox({ type = 'text', name, id, content, formEl = 'input' }) {
  return (
    <div className={inputContainer}>
      <Field
        as={formEl}
        type={type}
        name={name}
        id={id}
        placeholder={content}
        className={formEl === 'input' ? appointmentEnter : appointmentEnterComment}
        autoComplete="on"
      />

      {formEl === 'input' && (
        <>
          <label htmlFor={id} className={appointmentLabel}>
            {content}
          </label>
          <ErrorMessage name={name} className={inputError} component="span" />
        </>
      )}
    </div>
  );
}

export default InputBox;
