import { NavLink, useLocation } from 'react-router';
import style from './DesktopNavigate.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
const URL = 'http://localhost:4000/api/users';
const BASE_URL = 'http://localhost:4000/';

function DesktopNavigate() {
  const location = useLocation();
  const firstLoad = useRef(true);

  function setClassesActiveLink({ isActive }) {
    if (firstLoad.current && location.pathname === '/') {
      return clsx(style.navLink);
    } else {
      firstLoad.current = false;

      return clsx(style.navLink, isActive && style.activeLink);
    }
  }
  return (
    <nav className={style.desktopNavigate}>
      <ul className={style.navList}>
        <li className={style.navItem}>
          <NavLink to="." className={setClassesActiveLink}>
            Home
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink to="services" className={setClassesActiveLink}>
            Services
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink to="blog" className={setClassesActiveLink}>
            Blog
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink to="for-customers" className={setClassesActiveLink}>
            For customers
          </NavLink>
        </li>
        <li className={style.navItem}>
          <NavLink to="contacts" className={setClassesActiveLink}>
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DesktopNavigate;
