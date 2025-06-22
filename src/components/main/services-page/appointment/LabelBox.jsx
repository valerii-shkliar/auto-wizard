import style from './Appointment.module.scss';
const { labelContainer, labelIcon, labelText } = style;

function LabelBox({ content, icon: Icon }) {
  return (
    <div className={labelContainer}>
      {Icon && <Icon className={labelIcon} />}
      <span className={labelText}>{content}</span>
    </div>
  );
}
export default LabelBox;
