import style from './Services.module.scss';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import { selectOpenedPartition } from '../../../../store/slices/servicesAppointment';
import { useEffect, useState } from 'react';
const { servicesContainer } = style;

function List({ partitionsList }) {
  const openedPartition = useSelector(selectOpenedPartition);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    let list = [];

    for (const partition of partitionsList) {
      if (partition.partition === openedPartition) {
        list = partition.servicesList;
      }
    }
    setServicesList(list);
  }, [partitionsList, openedPartition]);

  return (
    <div className={servicesContainer}>
      <ul className={style.servicesList}>
        {servicesList.map((service) => (
          <ListItem key={service.id} service={service} />
        ))}
      </ul>
    </div>
  );
}

export default List;
