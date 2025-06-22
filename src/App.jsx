import { Route, Routes } from 'react-router';
import './App.scss';
import HomePage from './components/main/HomePage';
import BlogPage from './components/main/BlogPage';
import ContactsPage from './components/main/ContactsPage';
import ErrorPage from './components/main/ErrorPage';
import ForCustomersPage from './components/main/ForCustomersPage';
import MainLayout from './components/layouts/MainLayout';
import Services from './components/main/services-page/services/Services';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="services" element={<Services />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="for-customers" element={<ForCustomersPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
