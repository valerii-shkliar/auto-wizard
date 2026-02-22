import { BiSolidContact } from 'react-icons/bi';
import { FaCar } from 'react-icons/fa';
import { BsFillPencilFill } from 'react-icons/bs';
import { memo, useEffect, useState } from 'react';
import { APPOINTMENTS_URL } from './../../../../api/url';
import InputBox from './InputBox';
import AdditionalButton from './AdditionalButton';
import LabelBox from './LabelBox';
import style from './Appointment.module.scss';
import { useSelector } from 'react-redux';
import {
  selectOptedServices,
  selectQuantAllServices,
} from '../../../../store/slices/services-section/servicesAppointmentSlice';
import { Formik, Form } from 'formik';
import { regExpAnyDigits } from '../../../../constants/regExp';
import { validationSchemaAppointment } from './validationSchemaAppointment';
import ServicesApi from '../../../../api/ServicesApi';

const { appointmentSection, title, appointmentForm, signUpBtn, titleCost, costText } = style;
const initialValues = {
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
  const [cost, setCost] = useState(0);
  const quantAllServices = useSelector(selectQuantAllServices);
  const optedServices = useSelector(selectOptedServices);

  function handleAdditionalButtonClick(value) {
    setOpenedAdditionalInfo({ ...openedAdditionalInfo, [value]: !openedAdditionalInfo[value] });
  }

  useEffect(() => {
    let newCost = 0;

    newCost = optedServices.reduce((acc, partition) => {
      if (partition.servicesList.length !== 0) {
        return (
          acc +
          partition.servicesList.reduce((acc, service) => {
            const num = service.price.match(regExpAnyDigits)[0];

            return acc + Number(num);
          }, 0)
        );
      }
      return acc;
    }, 0);

    setCost(newCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantAllServices]);

  useEffect(() => {
    ServicesApi.create(APPOINTMENTS_URL, {
      name: 'Valerii',
      phone: '+380633975288',
      comment: 'I am the best developer!',
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const headerJSX = quantAllServices ? (
    <div className={titleCost}>
      <span
        className={costText}
      >{`Approximately cost for ${quantAllServices} services selected:`}</span>
      <h3 className={style.cost}>{cost}</h3>
    </div>
  ) : (
    <h3 className={title}>Create appointment</h3>
  );

  return (
    <div className={appointmentSection}>
      {headerJSX}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaAppointment}
        onSubmit={(values, { resetForm }) => {
          console.log('Submitted values:', values);
          resetForm();
        }}
      >
        <Form className={appointmentForm}>
          <LabelBox content="Contacts:" icon={BiSolidContact} />

          <InputBox name="name" id="name" content="Your name" />
          <InputBox type="tel" name="phone" id="phone" content="Phone number" />

          {openedAdditionalInfo.vehicle ? (
            <>
              <LabelBox content="Vehicle data:" icon={FaCar} />
              <InputBox name="vin" id="vin" content="VIN" />
              <InputBox type="number" name="millage" id="millage" content="Millage" />
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
              <InputBox name="comment" id="comment" content="Comment" formEl="textarea" />
            </>
          ) : (
            <AdditionalButton
              content="Add comment"
              onClick={() => handleAdditionalButtonClick('comment')}
            />
          )}
          <button type="submit" className={signUpBtn}>
            Take appointment
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default memo(Appointment);
