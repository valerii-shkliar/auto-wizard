import { IoSearch } from 'react-icons/io5';
import style from './Services.module.scss';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectTest, test } from '../../../../store/slices/servicesAppointment';
const { headContainer, title, inputContainer, iconContainer, icon, searchInput } = style;

function Head() {
  return (
    <div className={headContainer}>
      <h3 className={title}>Categories services</h3>
      <div className={inputContainer}>
        <div className={iconContainer}>
          <IoSearch className={icon} />
        </div>
        <input className={searchInput} name="searchInput" placeholder="Search..." />
      </div>
    </div>
  );
}

export default memo(Head);
