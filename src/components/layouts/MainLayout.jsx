import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </>
  );
}

export default MainLayout;
