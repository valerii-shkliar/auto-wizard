import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import style from './Services.module.scss';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFilter,
  selectFilterTitle,
  setFilterByTitle,
} from '../../../../store/slices/services-section/filterSlice';
import clsx from 'clsx';
import { resetOpenedPartition } from '../../../../store/slices/services-section/servicesAppointmentSlice';
const {
  headContainer,
  title,
  inputContainer,
  iconContainer,
  icon,
  clearIcon,
  active,
  searchInput,
} = style;

function Head() {
  const dispatch = useDispatch();
  const filterTitle = useSelector(selectFilterTitle);
  const deleteIconClass = clsx(icon, clearIcon, filterTitle && active);

  function handleSearchInputChange(e) {
    dispatch(setFilterByTitle(e.target.value));
    dispatch(resetOpenedPartition());
  }

  function handleDeleteIconClick() {
    dispatch(resetFilter());
  }

  return (
    <div className={headContainer}>
      <h3 className={title}>Categories services</h3>
      <div className={inputContainer}>
        <div className={iconContainer}>
          <IoSearch className={icon} />
        </div>
        <input
          className={searchInput}
          name="searchInput"
          placeholder="Search..."
          onChange={handleSearchInputChange}
          value={filterTitle}
        />
        <div className={iconContainer}>
          <TiDelete className={deleteIconClass} onClick={handleDeleteIconClick} />
        </div>
      </div>
    </div>
  );
}

export default memo(Head);
