import { configureStore } from '@reduxjs/toolkit';
import servicesAppointmentReducer from './slices/servicesAppointment';

const store = configureStore({
  reducer: {
    servicesAppointment: servicesAppointmentReducer,
  },
});

export default store;
