import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import {
  selectOpenedPartition,
  selectOptedServices,
  selectQuantAllServices,
  selectServicesByOpenedPartition,
} from '../../../../store/slices/servicesAppointment';
import { partitionCart } from './Partitions';
import CartList from './CartList';
import style from './Services.module.scss';
const { servicesContainer } = style;

function List() {
  const openedPartition = useSelector(selectOpenedPartition);
  const partitionItem = useSelector(selectServicesByOpenedPartition);
  const quantAllServices = useSelector(selectQuantAllServices);
  const optedServices = useSelector(selectOptedServices);
  const isRenderCartList = openedPartition && partitionCart.type === openedPartition;

  const servicesListJSX = isRenderCartList ? (
    <div className={servicesContainer}>
      <ul>
        {optedServices.map((servicePartition, index) => (
          <CartList key={index} servicePartition={servicePartition} />
        ))}
      </ul>
    </div>
  ) : (
    <div className={servicesContainer}>
      <ul className={style.servicesList}>
        {partitionItem &&
          partitionItem.map((service) => <ListItem key={service.id} service={service} />)}
      </ul>
    </div>
  );

  return (openedPartition === partitionCart.type && !quantAllServices) || !openedPartition ? (
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
