import { useState } from 'react';
import Wrapper from '../../../layouts/Wrapper';
import Head from './Head';
import Partitions from './Partitions';
import List from './List';
import Appointment from './../appointment/Appointment';
import style from './Services.module.scss';
const { wrapper, servicesSection, mainContainer } = style;

function Services() {
  const [servicesList, setServicesList] = useState([]);

  function sendServicesList(list) {
    setServicesList(list);
  }

  return (
    <section>
      <Wrapper className={wrapper}>
        <div className={servicesSection}>
          <Head />
          <div className={mainContainer}>
            <Partitions sendServicesList={sendServicesList} />
            <List servicesList={servicesList} />
          </div>
        </div>
        <Appointment />
      </Wrapper>
    </section>
  );
}

export default Services;
