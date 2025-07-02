import { useDispatch, useSelector } from 'react-redux';
import {
  markOpenedPartition,
  selectCountServices,
  selectedServicesInPartitions,
  selectOpenedPartition,
} from './../../../../store/slices/servicesAppointment';
import style from './Services.module.scss';
import { useMemo } from 'react';
import clsx from 'clsx';
import { FaCartArrowDown } from 'react-icons/fa6';
const { partitionItem, partition, partitionIcon, partitionName, quantChosenServices, active } =
  style;

function PartitionItem({ icon, title, index, type }) {
  const selectCount = useMemo(() => selectedServicesInPartitions(title), [title]);
  const count = useSelector(selectCount);
  const openedPartition = useSelector(selectOpenedPartition);
  const dispatch = useDispatch();
  const countServices = useSelector(selectCountServices);
  const iconClass = clsx(partitionIcon, countServices ? active : '');
  const partitionClass = clsx(
    partition,
    openedPartition === title || openedPartition === type ? active : ''
  );

  function handlePartitionClick() {
    if (type) {
      dispatch(markOpenedPartition(type));
      return;
    }
    dispatch(markOpenedPartition(title));
  }

  const cartJSX = (
    <li className={partitionItem}>
      <div className={partitionClass} onClick={handlePartitionClick}>
        <FaCartArrowDown className={iconClass} />
        <p className={partitionName}>{title}</p>
        <span className={quantChosenServices}>{countServices}</span>
      </div>
    </li>
  );
  const itemJSX = (
    <li className={partitionItem}>
      <div className={partitionClass} onClick={handlePartitionClick}>
        <img className={partitionIcon} src={icon} alt={title} />
        <p className={partitionName}>{title}</p>
        <span className={quantChosenServices}>{count || 0}</span>
      </div>
    </li>
  );

  return index === 0 ? cartJSX : itemJSX;
}

export default PartitionItem;
