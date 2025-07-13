import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import {
  selectAllServices,
  selectOpenedPartition,
  selectOptedServices,
  selectQuantAllServices,
  selectServicesByOpenedPartition,
} from '../../../../store/slices/services-section/servicesAppointmentSlice';
import { partitionCart } from './Partitions';
import CartList from './CartList';
import style from './Services.module.scss';
import { selectFilterTitle } from '../../../../store/slices/services-section/filterSlice';
import { useEffect, useState } from 'react';
const { servicesContainer } = style;

function List() {
  const [filteredServices, setFilteredServices] = useState([]);
  const [regExp, setRegExp] = useState({});
  const allServices = useSelector(selectAllServices);
  const openedPartition = useSelector(selectOpenedPartition);
  const partitionItem = useSelector(selectServicesByOpenedPartition);
  const quantAllServices = useSelector(selectQuantAllServices);
  const optedServices = useSelector(selectOptedServices);
  const filterTitle = useSelector(selectFilterTitle);
  const isRenderCartList = openedPartition && partitionCart.type === openedPartition;
  const isRenderEmptyServices =
    ((partitionCart.type === openedPartition && quantAllServices === 0) || !openedPartition) &&
    !filterTitle;

  useEffect(() => {
    const regExp = new RegExp(`(${filterTitle.toLowerCase()})`, 'gi');
    const filteredList = createFilteredList(allServices, regExp);

    setFilteredServices([...filteredList]);
    setRegExp(regExp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTitle]);

  function createFilteredList(allServices, regExp) {
    const list = [];

    for (let i = 0; i < allServices.length; i++) {
      const servicesList = allServices[i].servicesList;
      const partitionTitle = allServices[i].partition;
      let isPartitionAdded = false;

      for (let i = 0; i < servicesList.length; i++) {
        const serviceItem = servicesList[i];
        const serviceName = serviceItem.name.toLowerCase();

        if (regExp.test(serviceName)) {
          if (!isPartitionAdded) {
            list.push({ partition: partitionTitle, servicesList: [{ ...serviceItem }] });
            isPartitionAdded = true;
          } else {
            list.forEach((filteredPartition) => {
              if (filteredPartition.partition === partitionTitle) {
                filteredPartition.servicesList.push(serviceItem);
              }
            });
          }
          regExp.lastIndex = 0;
        }
      }
    }

    return list;
  }

  const servicesListJSX =
    isRenderCartList || filterTitle ? (
      <div className={servicesContainer}>
        <ul>
          {isRenderCartList &&
            optedServices.map((servicePartition, index) => (
              <CartList key={index} servicePartition={servicePartition} />
            ))}
          {filterTitle &&
            filteredServices.map((servicePartition, index) => (
              <CartList key={index} servicePartition={servicePartition} regExp={regExp} />
            ))}
        </ul>
      </div>
    ) : (
      <div className={servicesContainer}>
        <ul className={style.servicesList}>
          {partitionItem &&
            partitionItem.map((service) => (
              <ListItem key={service.id} service={service} partition={openedPartition} />
            ))}
        </ul>
      </div>
    );

  return isRenderEmptyServices ? (
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
