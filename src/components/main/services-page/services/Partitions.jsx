import { v4 as uuidv4 } from 'uuid';
import style from './Services.module.scss';
import PartitionItem from './PartitionItem';
import { useSelector } from 'react-redux';
import { selectAllServices } from '../../../../store/slices/servicesAppointment';
import PartitionCart from './PartitionCart';
const { partitionContainer, partitionList } = style;
export const partitionCart = {
  id: uuidv4(),
  partition: 'Chosen Services',
  type: 'servicesCart',
};

function Partitions() {
  const partitionsList = useSelector(selectAllServices);

  return (
    <div className={partitionContainer}>
      <ul className={partitionList}>
        <PartitionCart partition={partitionCart.partition} type={partitionCart.type} />
        {partitionsList?.map(({ id, partition: title, icon }, index) => {
          return <PartitionItem key={id} index={index} icon={icon} title={title} />;
        })}
      </ul>
    </div>
  );
}

export default Partitions;
