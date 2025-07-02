import style from './Services.module.scss';
import PartitionItem from './PartitionItem';
const { partitionContainer, partitionList } = style;

function Partitions({ partitionsList }) {
  return (
    <div className={partitionContainer}>
      <ul className={partitionList}>
        {partitionsList?.map(({ id, partition: title, icon, type }, index) => {
          return <PartitionItem key={id} index={index} icon={icon} title={title} type={type} />;
        })}
      </ul>
    </div>
  );
}

export default Partitions;
