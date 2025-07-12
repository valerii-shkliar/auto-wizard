import { useDispatch, useSelector } from 'react-redux';
import {
  markOpenedPartition,
  selectQuantServicesInPartition,
  selectOpenedPartition,
} from './../../../../store/slices/servicesAppointment';
import style from './Services.module.scss';
import { useMemo } from 'react';
import clsx from 'clsx';
import { resetFilter } from '../../../../store/slices/services-section/filterSlice';
const { partitionItem, partition, partitionIcon, partitionName, quantChosenServices, active } =
  style;

function PartitionItem({ icon, title }) {
  const quantServices = useSelector(useMemo(() => selectQuantServicesInPartition(title), [title]));
  const openedPartition = useSelector(selectOpenedPartition);
  const dispatch = useDispatch();
  const partitionClass = clsx(partition, openedPartition === title ? active : '');

  function handlePartitionClick() {
    dispatch(markOpenedPartition(title));
    dispatch(resetFilter());
  }

  return (
    <li className={partitionItem}>
      <div className={partitionClass} onClick={handlePartitionClick}>
        <img className={partitionIcon} src={icon} alt={title} />
        <p className={partitionName}>{title}</p>
        <span className={quantChosenServices}>{quantServices}</span>
      </div>
    </li>
  );
}

export default PartitionItem;
