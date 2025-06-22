import { FaPlus } from 'react-icons/fa6';
import style from './Appointment.module.scss';

import clsx from 'clsx';
const { labelContainer, labelIcon, labelText, additionalInfo } = style;

function AdditionalButton({ content, onClick }) {
  const additionalInfoClass = clsx(labelContainer, additionalInfo);

  return (
    <div className={additionalInfoClass} onClick={onClick}>
      <FaPlus className={labelIcon} />
      <span className={labelText}>{content}</span>
    </div>
  );
}

export default AdditionalButton;
