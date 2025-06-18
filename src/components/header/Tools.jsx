import { IoSearch, IoCartOutline } from 'react-icons/io5';
import style from './Tools.module.scss';
import { Link } from 'react-router';

function Tools() {
  return (
    <div className={style.toolsContainer}>
      <div className={style.iconContainer}>
        <IoSearch className={style.cartIcon} />
      </div>
      <Link className={style.iconContainer}>
        <IoCartOutline className={style.cartIcon} />
        <span className={style.quantGoods}>2</span>
      </Link>
    </div>
  );
}

export default Tools;
