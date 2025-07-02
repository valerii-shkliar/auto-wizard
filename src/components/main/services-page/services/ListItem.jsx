import { useMemo } from 'react';
import { convertLeadTime } from '../../../../utilities/convertLeadTime';
import style from './Services.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addService,
  removeService,
  selectChosenServiceById,
  selectOpenedPartition,
} from '../../../../store/slices/servicesAppointment';
import { partitionCart } from './Services';
const { servicesItem, choseService, serviceName, serviceTimeLead, servicePrice } = style;

function ListItem({ service, checked }) {
  const { name, price, leadTime, id } = service;
  const dispatch = useDispatch();
  const chosenServiceCallback = useMemo(() => selectChosenServiceById(id), [id]);
  const chosenService = useSelector(chosenServiceCallback);
  const openedPartition = useSelector(selectOpenedPartition);
  const isChecked = chosenService || checked ? true : false;

  function handleChoseServiceChange() {
    if (partitionCart.type === openedPartition) {
      dispatch(removeService(service));
      return;
    }
    if (!chosenService) {
      dispatch(addService(service));
    } else {
      dispatch(removeService(service));
    }
  }

  return (
    <li className={servicesItem}>
      <div className={style.service} onClick={handleChoseServiceChange}>
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

export default ListItem;
