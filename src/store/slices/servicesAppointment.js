import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  usersData: {
    userName: '',
    userPhoneNumber: '',
    vehicleVin: '',
    vehicleMillage: '',
    comment: '',
  },
  services: {},
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
    },
    removeService: (state, { payload }) => {
      const partition = state.openedPartition;

      return {
        ...state,
        services: {
          ...state.services,
          [partition]: state.services[partition].filter((service) => service.id !== payload.id),
        },
      };
    },
    markOpenedPartition: (state, { payload }) => {
      state.openedPartition = payload;
    },
  },
});

export const selectOpenedPartition = (state) => {
  return state.servicesAppointment.openedPartition;
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

export const { addService, removeService, markOpenedPartition } = servicesAppointmentSlice.actions;
export default servicesAppointmentSlice.reducer;
