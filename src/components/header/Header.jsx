import logo from '../../images/logo/auto_wizard_logo.svg';
import DesktopNavigate from './DesktopNavigate';
import style from './Header.module.scss';
import Tools from './Tools';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <a href="/">
          <img className={style.logo} src={logo} alt="logo" title="Auto Wizard" />
        </a>
        <DesktopNavigate />
        <Tools />
      </div>
    </header>
  );
}

export default Header;
