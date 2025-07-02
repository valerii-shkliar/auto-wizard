import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Wrapper from '../../../layouts/Wrapper';
import Head from './Head';
import Partitions from './Partitions';
import List from './List';
import Appointment from './../appointment/Appointment';
import style from './Services.module.scss';
import ServicesApi from '../../../../api/ServicesApi';
const { wrapper, servicesSection, mainContainer } = style;
const URL = 'http://localhost:4000/api/services/';
export const partitionCart = {
  id: uuidv4(),
  partition: 'Chosen Services',
  type: 'servicesCart',
};

function Services() {
  const [partitionsList, setPartitionsList] = useState([]);

  useEffect(() => {
    ServicesApi.getList(URL).then((list) => {
      list.unshift(partitionCart);
      setPartitionsList(list);
    });
  }, []);

  return (
    <section>
      <Wrapper className={wrapper}>
        <div className={servicesSection}>
          <Head />
          <div className={mainContainer}>
            <Partitions partitionsList={partitionsList} />
            <List partitionsList={partitionsList} />
          </div>
        </div>
        <Appointment />
      </Wrapper>
    </section>
  );
}

export default Services;
