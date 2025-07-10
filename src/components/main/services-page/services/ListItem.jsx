import { memo, useMemo } from 'react';
import { convertLeadTime } from '../../../../utilities/convertLeadTime';
import style from './Services.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addService,
  removeService,
  selectOptedServiceById,
  selectOpenedPartition,
} from '../../../../store/slices/servicesAppointment';
import { partitionCart } from './Partitions';
const { servicesItem, choseService, serviceName, serviceTimeLead, servicePrice } = style;

function ListItem({ service, checked }) {
  const { name, price, leadTime, id } = service;
  const dispatch = useDispatch();
  const optedServiceCallback = useMemo(() => selectOptedServiceById(id), [id]);
  const optedService = useSelector(optedServiceCallback);
  const openedPartition = useSelector(selectOpenedPartition);
  const isChecked = optedService || checked ? true : false;

  function handleServiceClick() {
    if (partitionCart.type === openedPartition) {
      dispatch(removeService(service));
      return;
    }
    if (!isChecked) {
      dispatch(addService(service));
    } else {
      dispatch(removeService(service));
    }
  }

  return (
    <li className={servicesItem}>
      <div className={style.service} onClick={handleServiceClick}>
        <input
          checked={isChecked}
          readOnly
          className={choseService}
          name="isChosen"
          type="checkbox"
        />

        <p className={serviceName}>{name}</p>
        <span className={serviceTimeLead}>{`approx.: ${convertLeadTime(leadTime)}`}</span>
        <span className={servicePrice}>{`from ${price}`}</span>
      </div>
    </li>
  );
}

export default memo(ListItem);
