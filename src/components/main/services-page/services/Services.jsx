import { useEffect } from 'react';
import Wrapper from '../../../layouts/Wrapper';
import Head from './Head';
import Partitions from './Partitions';
import List from './List';
import Appointment from './../appointment/Appointment';
import style from './Services.module.scss';
import ServicesApi from '../../../../api/ServicesApi';
import { useDispatch } from 'react-redux';
import { saveAllServices } from '../../../../store/slices/servicesAppointment';
const { wrapper, servicesSection, mainContainer } = style;
const SERVICES_URL = 'http://localhost:4000/api/services/';

function Services() {
  const dispatch = useDispatch();

  useEffect(() => {
    ServicesApi.getList(SERVICES_URL).then((list) => {
      dispatch(saveAllServices(list));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Wrapper className={wrapper}>
        <div className={servicesSection}>
          <Head />
          <div className={mainContainer}>
            <Partitions />
            <List />
          </div>
        </div>
        <Appointment />
      </Wrapper>
    </section>
  );
}

export default Services;
