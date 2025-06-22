import { useEffect, useState } from 'react';
import ServicesApi from '../../../../api/ServicesApi';
import style from './Services.module.scss';
const {
  partitionContainer,
  partitionList,
  partitionItem,
  partition,
  partitionIcon,
  partitionName,
  quantChosenServices,
} = style;
const URL = 'http://localhost:4000/api/services/';

function Partitions({ sendServicesList }) {
  const [partitionsList, setPartitionsList] = useState([]);

  useEffect(() => {
    ServicesApi.getList(URL).then((list) => {
      console.log(list);
      setPartitionsList(list);
    });
  }, []);

  function handlePartitionClick(index) {
    const servicesList = partitionsList[index].servicesList;

    sendServicesList(servicesList);
  }
  return (
    <div className={partitionContainer}>
      <ul className={partitionList}>
        {partitionsList.map(({ id, partition: title, icon }, index) => {
          return (
            <li key={id} className={partitionItem}>
              <div className={partition} onClick={() => handlePartitionClick(index)}>
                <img className={partitionIcon} src={icon} alt={title} />
                <p className={partitionName}>{title}</p>
                <span className={quantChosenServices}>0</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Partitions;
