import style from './Services.module.scss';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import {
  selectChosenAllServices,
  selectCountServices,
  selectOpenedPartition,
} from '../../../../store/slices/servicesAppointment';
import { useEffect, useState } from 'react';
import { partitionCart } from './Services';
import CartList from './CartList';
const { servicesContainer } = style;

function List({ partitionsList }) {
  const openedPartition = useSelector(selectOpenedPartition);
  const chosenServices = useSelector(selectChosenAllServices);
  const countServices = useSelector(selectCountServices);
  const [servicesList, setServicesList] = useState([]);
  const [chosenServicesList, setChosenServicesList] = useState([]);

  useEffect(() => {
    let list = [];

    if (partitionCart.type === openedPartition) {
      list = fillServicesCart(chosenServices);
      setChosenServicesList(list);
    } else {
      for (const partition of partitionsList) {
        if (partition.partition === openedPartition) {
          list = partition.servicesList;
        }
      }
      setServicesList(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partitionsList, openedPartition]);

  function fillServicesCart(services) {
    const newList = [];

    for (const key in services) {
      if (Object.prototype.hasOwnProperty.call(services, key)) {
        const serviceItem = { partition: key, servicesList: services[key] };

        newList.push(serviceItem);
      }
    }
    return newList;
  }

  const servicesListJSX =
    partitionCart.type === openedPartition ? (
      <div className={servicesContainer}>
        <ul>
          {chosenServicesList.map((servicePartition, index) => (
            <CartList key={index} servicePartition={servicePartition} />
          ))}
        </ul>
      </div>
    ) : (
      <div className={servicesContainer}>
        <ul className={style.servicesList}>
          {servicesList.map((service) => (
            <ListItem key={service.id} service={service} />
          ))}
        </ul>
      </div>
    );

  return openedPartition === partitionCart.type && !countServices ? (
    <div className={servicesContainer}>
      <h4 className={style.titleEmptyServices}>Here may be your order</h4>
      <p className={style.textAboutServices}>
        You can choose needed services, then create appointment
      </p>
      <p className={style.textAboutServices}>...or such create appointment</p>
    </div>
  ) : (
    servicesListJSX
  );
}

export default List;
