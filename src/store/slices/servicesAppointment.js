import { createSlice } from '@reduxjs/toolkit';
const SERVICE_CART = 'servicesCart';
const initialState = {
  usersData: {
    userName: '',
    userPhoneNumber: '',
    vehicleVin: '',
    vehicleMillage: '',
    comment: '',
  },
  services: {},
  countServices: 0,
  openedPartition: '',
};

const servicesAppointmentSlice = createSlice({
  name: 'servicesAppointment',
  initialState,
  reducers: {
    addService: (state, { payload }) => {
      const partitionsNames = Object.keys(state.services);
      let foundPartition = false;

      for (let i = 0; i < partitionsNames.length; i++) {
        const partitionName = partitionsNames[i];

        if (partitionName === state.openedPartition) {
          state.services[partitionName].push(payload);
          foundPartition = true;
          break;
        }
      }
      if (!foundPartition) {
        state.services[state.openedPartition] = [{ ...payload }];
      }
      state.countServices++;
    },
    removeService: (state, { payload }) => {
      let services = state.services;
      --state.countServices;

      if (state.openedPartition === SERVICE_CART) {
        for (const key in services) {
          if (Object.prototype.hasOwnProperty.call(services, key)) {
            services[key] = services[key].filter((item) => item.id !== payload.id);
          }
        }
      } else {
        services[state.openedPartition] = services[state.openedPartition].filter(
          (service) => service.id !== payload.id
        );
      }
    },
    markOpenedPartition: (state, { payload }) => {
      state.openedPartition = payload;
    },
  },
});

export const selectOpenedPartition = (state) => {
  return state.servicesAppointment.openedPartition;
};

export const selectCountServices = (state) => {
  return state.servicesAppointment.countServices;
};

export const selectedServicesInPartitions = (title) => {
  return (state) => {
    const partition = state.servicesAppointment?.services[title];

    return partition?.length;
  };
};

export const selectChosenServiceById = (id) => {
  return (state) => {
    const servicesList =
      state.servicesAppointment.services[state.servicesAppointment.openedPartition];

    if (servicesList) {
      return servicesList.find((service) => service.id === id);
    }
    return false;
  };
};

export const selectChosenAllServices = (state) => {
  return state.servicesAppointment.services;
};

export const { addService, removeService, markOpenedPartition } = servicesAppointmentSlice.actions;
export default servicesAppointmentSlice.reducer;
