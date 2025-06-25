import { BiSolidContact } from 'react-icons/bi';
import { FaCar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { BsFillPencilFill } from 'react-icons/bs';
import { memo, useState } from 'react';
import InputBox from './InputBox';
import AdditionalButton from './AdditionalButton';
import LabelBox from './LabelBox';
import style from './Appointment.module.scss';
const {
  appointmentSection,
  title,
  appointmentForm,
  appointmentEnterComment,
  inputContainer,
  signUpBtn,
} = style;
const initialFormState = {
  name: '',
  phone: '',
  vin: '',
  millage: '',
  comment: '',
};

function Appointment() {
  const [openedAdditionalInfo, setOpenedAdditionalInfo] = useState({
    vehicle: false,
    comment: false,
  });
  const [formData, setFormData] = useState(initialFormState);

  function handleAdditionalButtonClick(value) {
    setOpenedAdditionalInfo({ ...openedAdditionalInfo, [value]: !openedAdditionalInfo[value] });
  }

  function handleAppointmentFormSubmit() {}

  return (
    <div className={appointmentSection}>
      <h3 className={title}>Create appointment</h3>
      <form className={appointmentForm} action="POST" onSubmit={handleAppointmentFormSubmit}>
        <LabelBox content="Contacts:" icon={BiSolidContact} />

        <InputBox
          name="name"
          content="Your name"
          required={true}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <InputBox
          type="tel"
          name="phone"
          content="Phone number"
          required={true}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {openedAdditionalInfo.vehicle ? (
          <>
            <LabelBox content="Vehicle data::" icon={FaCar} />
            <InputBox
              name="vin"
              content="VIN"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            />
            <InputBox
              type="number"
              name="millage"
              content="Millage"
              value={formData.millage}
              onChange={(e) => setFormData({ ...formData, millage: e.target.value })}
            />
          </>
        ) : (
          <AdditionalButton
            content="Add vehicle data"
            onClick={() => handleAdditionalButtonClick('vehicle')}
          />
        )}

        {openedAdditionalInfo.comment ? (
          <>
            <LabelBox content="Appointment comment:" icon={BsFillPencilFill} />
            <div className={inputContainer}>
              <textarea
                type="text"
                name="comment"
                id="enterComment"
                placeholder="Comment"
                className={appointmentEnterComment}
              />
            </div>
          </>
        ) : (
          <AdditionalButton
            content="Add comment"
            onClick={() => handleAdditionalButtonClick('comment')}
          />
        )}
        <button className={signUpBtn}>Sign up</button>
      </form>
    </div>
  );
}

export default memo(Appointment);
