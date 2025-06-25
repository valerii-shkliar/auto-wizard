import { useDispatch, useSelector } from 'react-redux';
import {
  markOpenedPartition,
  selectedServicesInPartitions,
  selectOpenedPartition,
} from './../../../../store/slices/servicesAppointment';
import style from './Services.module.scss';
import { useMemo } from 'react';
import clsx from 'clsx';
const { partitionItem, partition, partitionIcon, partitionName, quantChosenServices, active } =
  style;

function PartitionItem({ icon, title }) {
  const selectCount = useMemo(() => selectedServicesInPartitions(title), [title]);
  const count = useSelector(selectCount);
  const openedPartition = useSelector(selectOpenedPartition);
  const dispatch = useDispatch();

  function setClass() {
    return clsx(partition, openedPartition === title ? active : '');
  }

  function handlePartitionClick() {
    dispatch(markOpenedPartition(title));
  }

  return (
    <li className={partitionItem}>
      <div className={setClass()} onClick={handlePartitionClick}>
        <img className={partitionIcon} src={icon} alt={title} />
        <p className={partitionName}>{title}</p>
        <span className={quantChosenServices}>{count || 0}</span>
      </div>
    </li>
  );
}

export default PartitionItem;
