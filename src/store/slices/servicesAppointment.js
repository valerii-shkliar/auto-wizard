import { createSelector, createSlice } from '@reduxjs/toolkit';
const SERVICE_CART = 'servicesCart';
const initialState = {
  allServices: [],
  optedServices: [],
  quantAllServices: 0,
  openedPartition: '',
};

const servicesAppointmentSlice = createSlice({
  name: 'servicesAppointment',
  initialState,
  reducers: {
    addService: (state, { payload }) => {
      let foundPartition = false;
      const optedServices = state.optedServices;
      state.quantAllServices++;

      for (let i = 0; i < optedServices.length; i++) {
        const partitionItem = optedServices[i];

        if (partitionItem.partition === payload.partition) {
          partitionItem.servicesList.push(payload.service);
          foundPartition = true;
          break;
        }
      }
      if (!foundPartition) {
        const addedService = {
          partition: payload.partition,
          servicesList: [{ ...payload.service }],
        };
        state.optedServices.push(addedService);
      }
    },
    removeService: (state, { payload }) => {
      const optedServices = state.optedServices;
      state.quantAllServices--;

      if (payload.partition === SERVICE_CART) {
        removeServiceFromCart(optedServices, payload.service);
      } else {
        removeServiceFromOpenedPartitions(optedServices, payload.partition, payload.service);
      }
    },
    markOpenedPartition: (state, { payload }) => {
      state.openedPartition = payload;
    },
    resetOpenedPartition: (state) => {
      state.openedPartition = '';
    },
    saveAllServices: (state, { payload }) => {
      state.allServices = payload;
    },
  },
});

export const {
  addService,
  removeService,
  markOpenedPartition,
  resetOpenedPartition,
  saveAllServices,
} = servicesAppointmentSlice.actions;
export default servicesAppointmentSlice.reducer;

function removeServiceFromCart(optedServices, payload) {
  for (let i = 0; i < optedServices.length; i++) {
    const serviceIndex = optedServices[i].servicesList.findIndex((service) => {
      return service.id === payload.id;
    });

    if (serviceIndex !== -1) {
      optedServices[i].servicesList.splice(serviceIndex, 1);
      break;
    }
  }
}
function removeServiceFromOpenedPartitions(optedServices, openedPartition, payload) {
  for (let i = 0; i < optedServices.length; i++) {
    const partitionItem = optedServices[i];

    if (partitionItem.partition === openedPartition) {
      partitionItem.servicesList = partitionItem.servicesList.filter(
        (service) => service.id !== payload.id
      );
      break;
    }
  }
}

export const selectQuantAllServices = (state) => {
  return state.servicesAppointment.quantAllServices;
};

export const selectOpenedPartition = (state) => {
  return state.servicesAppointment.openedPartition;
};

export const selectAllServices = (state) => {
  return state.servicesAppointment.allServices;
};

export const selectOptedServices = (state) => {
  return state.servicesAppointment.optedServices;
};

export const selectOptedServiceById = (id) => {
  return (state) => {
    const service = getServiceById(state, id);

    if (service) {
      return service;
    }
    return false;
  };
};

export const selectServicesByOpenedPartition = createSelector(
  [selectOpenedPartition, selectAllServices],
  (openedPartition, allServices) => {
    return getServicesListByPartition(allServices, openedPartition);
  }
);

export const selectQuantServicesInPartition = (title) => {
  return createSelector(selectOptedServices, (optedServices) => {
    const servicesList = getServicesListByPartition(optedServices, title);

    return servicesList?.length || 0;
  });
};

function getServicesListByPartition(services, openedPartition) {
  for (let i = 0; i <= services.length; i++) {
    if (services[i]?.partition === openedPartition) {
      return services[i].servicesList;
    }
  }
  return [];
}

function getServiceById(state, id) {
  const services = state.servicesAppointment.optedServices;

  for (let i = 0; i < services.length; i++) {
    const service = services?.[i].servicesList.find((item) => item.id === id);

    if (service) {
      return service;
    }
  }
}
