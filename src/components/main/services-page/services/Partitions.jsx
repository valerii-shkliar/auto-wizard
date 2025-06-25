import { FaCartArrowDown } from 'react-icons/fa6';
import style from './Services.module.scss';
import PartitionItem from './PartitionItem';
const {
  partitionContainer,
  partitionList,
  partitionItem,
  partition,
  partitionIcon,
  partitionName,
  quantChosenServices,
} = style;

function Partitions({ partitionsList }) {
  return (
    <div className={partitionContainer}>
      <ul className={partitionList}>
        <li className={partitionItem}>
          <div className={partition} onClick={() => {}}>
            <FaCartArrowDown className={partitionIcon} />
            <p className={partitionName}>Chosen services</p>
            <span className={quantChosenServices}>0</span>
          </div>
        </li>
        {partitionsList?.map(({ id, partition: title, icon }, index) => {
          return <PartitionItem key={id} index={index} icon={icon} title={title} />;
        })}
      </ul>
    </div>
  );
}

export default Partitions;
