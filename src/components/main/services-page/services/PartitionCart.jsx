import { useDispatch, useSelector } from 'react-redux';
import {
  markOpenedPartition,
  selectOpenedPartition,
  selectQuantAllServices,
} from './../../../../store/slices/servicesAppointment';
import style from './Services.module.scss';
import clsx from 'clsx';
import { FaCartArrowDown } from 'react-icons/fa6';
const { partitionItem, partition, partitionIcon, partitionName, quantChosenServices, active } =
  style;

function PartitionCart({ partition: title, type }) {
  const openedPartition = useSelector(selectOpenedPartition);
  const dispatch = useDispatch();
  const quantAllServices = useSelector(selectQuantAllServices);

  const iconClass = clsx(partitionIcon, quantAllServices ? active : '');
  const partitionClass = clsx(partition, openedPartition === type ? active : '');

  function handlePartitionClick() {
    dispatch(markOpenedPartition(type));
  }

  return (
    <li className={partitionItem}>
      <div className={partitionClass} onClick={handlePartitionClick}>
        <FaCartArrowDown className={iconClass} />
        <p className={partitionName}>{title}</p>
        <span className={quantChosenServices}>{quantAllServices}</span>
      </div>
    </li>
  );
}

export default PartitionCart;
