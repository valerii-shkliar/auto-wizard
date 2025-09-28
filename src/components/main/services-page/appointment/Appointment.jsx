import { BiSolidContact } from 'react-icons/bi';
import { FaCar } from 'react-icons/fa';
import { BsFillPencilFill } from 'react-icons/bs';
import { memo, useEffect, useState } from 'react';
import InputBox from './InputBox';
import AdditionalButton from './AdditionalButton';
import LabelBox from './LabelBox';
import style from './Appointment.module.scss';
import { useSelector } from 'react-redux';
import {
  selectOptedServices,
  selectQuantAllServices,
} from '../../../../store/slices/services-section/servicesAppointmentSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const regExpName = new RegExp('^[a-zA-z]+$');
const regExpVin = new RegExp('^(?!.*[IOQ\\_])[\\w\\d]{17}$');
const regExpVinWithoutChar = new RegExp('[^IiOoQq\\_\\-]+');
const {
  appointmentSection,
  title,
  appointmentForm,
  appointmentEnterComment,
  inputContainer,
  signUpBtn,
  titleCost,
  costText,
} = style;

function Appointment() {
  const [openedAdditionalInfo, setOpenedAdditionalInfo] = useState({
    vehicle: false,
    comment: false,
  });
  const [cost, setCost] = useState(0);
  const quantAllServices = useSelector(selectQuantAllServices);
  const optedServices = useSelector(selectOptedServices);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      vin: '',
      millage: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(regExpName, '*Must be words')
        .min(2, '*Must be more 1 character')
        .required('*Enter your name'),
      phone: Yup.string()
        .min(10, '*Phone must be longer')
        .matches(/^\+?\d{0,3}\(?\d{0,2}\)?\d*-?\d*-?\d*$/, '*Must be a number')
        .required('*Enter your phone'),
      vin: Yup.string()
        .matches(regExpVinWithoutChar, '*Has not to be: "Q, I, O" or symbols')
        .min(17, '*Must be 17 characters')
        .max(17, '*Must be 17 characters'),
      millage: Yup.string('*Enter millage your vehicle').max(6, '*May be from 0 km to 999 999 km'),
      comment: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });
  console.log(formik);

  function handleAdditionalButtonClick(value) {
    setOpenedAdditionalInfo({ ...openedAdditionalInfo, [value]: !openedAdditionalInfo[value] });
  }

  useEffect(() => {
    let newCost = 0;
    const regExp = new RegExp(/[0-9]*/);

    newCost = optedServices.reduce((acc, partition) => {
      if (partition.servicesList.length !== 0) {
        return (
          acc +
          partition.servicesList.reduce((acc, service) => {
            const num = service.price.match(regExp)[0];

            return acc + Number(num);
          }, 0)
        );
      }
      return acc;
    }, 0);

    setCost(newCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantAllServices]);

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
      <form className={appointmentForm} action="POST" onSubmit={formik.handleSubmit}>
        <LabelBox content="Contacts:" icon={BiSolidContact} />

        <InputBox
          name="name"
          content="Your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {formik.touched.name && formik.errors.name ? formik.errors.name : null}
        </InputBox>

        <InputBox
          type="tel"
          name="phone"
          content="Phone number"
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          onChange={formik.handleChange}
        >
          {formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
        </InputBox>
        {openedAdditionalInfo.vehicle ? (
          <>
            <LabelBox content="Vehicle data:" icon={FaCar} />
            <InputBox
              name="vin"
              content="VIN"
              value={formik.values.vin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {formik.touched.vin && formik.errors.vin ? formik.errors.vin : null}
            </InputBox>
            <InputBox
              type="number"
              name="millage"
              content="Millage"
              value={formik.values.millage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {formik.touched.millage && formik.errors.millage ? formik.errors.millage : null}
            </InputBox>
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
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
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
      </form>
    </div>
  );
}

export default memo(Appointment);
