import { configureStore } from '@reduxjs/toolkit';
import servicesAppointmentReducer from './slices/services-section/servicesAppointmentSlice';
import servicesFilterReducer from './slices/services-section/filterSlice';

const store = configureStore({
  reducer: {
    servicesAppointment: servicesAppointmentReducer,
    servicesFilter: servicesFilterReducer,
  },
});

export default store;
