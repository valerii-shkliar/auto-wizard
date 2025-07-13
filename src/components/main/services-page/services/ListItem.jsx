import { memo, useMemo } from 'react';
import { convertLeadTime } from '../../../../utilities/convertLeadTime';
import style from './Services.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addService,
  removeService,
  selectOptedServiceById,
  selectOpenedPartition,
} from '../../../../store/slices/services-section/servicesAppointmentSlice';
import { partitionCart } from './Partitions';
import { selectFilterTitle } from '../../../../store/slices/services-section/filterSlice';
const { servicesItem, choseService, serviceName, serviceTimeLead, servicePrice, pointedText } =
  style;

function ListItem({ service, checked, partition, regExp }) {
  const { name, price, leadTime, id } = service;
  const dispatch = useDispatch();
  const optedServiceCallback = useMemo(() => selectOptedServiceById(id), [id]);
  const optedService = useSelector(optedServiceCallback);
  const openedPartition = useSelector(selectOpenedPartition);
  const filterTitle = useSelector(selectFilterTitle);
  const isChecked = optedService || (checked && !filterTitle) ? true : false;

  function handleServiceClick() {
    if (partitionCart.type === openedPartition) {
      dispatch(removeService({ service, partition }));
      return;
    }
    if (!isChecked) {
      dispatch(addService({ service, partition }));
    } else {
      dispatch(removeService({ service, partition }));
    }
  }

  function pointFilteredText(name, regExp) {
    const textsList = name.split(regExp);
    const res = [];

    for (let i = 0; i < textsList.length; i++) {
      const text = textsList[i];

      if (regExp.test(text)) {
        regExp.lastIndex = 0;
        res.push(
          <span key={i} className={pointedText}>
            {text}
          </span>
        );
        continue;
      }
      res.push(<span key={i}>{text}</span>);
    }
    return res;
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

        <p className={serviceName}>{regExp ? pointFilteredText(name, regExp) : name}</p>
        <span className={serviceTimeLead}>{`approx.: ${convertLeadTime(leadTime)}`}</span>
        <span className={servicePrice}>{`from ${price}`}</span>
      </div>
    </li>
  );
}

export default memo(ListItem);
