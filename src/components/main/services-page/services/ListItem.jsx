import { useState } from 'react';
import { convertLeadTime } from '../../../../utilities/convertLeadTime';
import style from './Services.module.scss';
const { servicesItem, choseService, serviceName, serviceTimeLead, servicePrice } = style;

function ListItem({ service }) {
  const [isChosenService, setIsChosenService] = useState(false);
  const { name, price, leadTime } = service;

  function handleChoseServiceChange() {
    setIsChosenService(!isChosenService);
  }

  return (
    <li className={servicesItem}>
      <div className={style.service} onClick={handleChoseServiceChange}>
        <input
          checked={isChosenService}
          onChange={handleChoseServiceChange}
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
