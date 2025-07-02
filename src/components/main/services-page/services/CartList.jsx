import style from './Services.module.scss';
import ListItem from './ListItem';

function CartList({ servicePartition }) {
  return servicePartition.servicesList.length === 0 ? null : (
    <li className={style.sectionChosenServices}>
      <h3 className={style.titleChosenServices}>{servicePartition.partition}</h3>
      <ul className={style.servicesList}>
        {servicePartition.servicesList?.map((service) => (
          <ListItem key={service.id} service={service} checked={true} />
        ))}
      </ul>
    </li>
  );
}
export default CartList;
