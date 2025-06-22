import style from './Services.module.scss';
import ListItem from './ListItem';
const { servicesContainer } = style;

function List({ servicesList }) {
  return (
    <div className={servicesContainer}>
      <ul className={style.servicesList}>
        {servicesList.map((service) => (
          <ListItem key={service.id} service={service} />
        ))}
      </ul>
    </div>
  );
}

export default List;
