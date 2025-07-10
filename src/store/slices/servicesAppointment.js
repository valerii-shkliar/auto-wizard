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

        if (partitionItem.partition === state.openedPartition) {
          partitionItem.servicesList.push(payload);
          foundPartition = true;
          break;
        }
      }
      if (!foundPartition) {
        const addedService = {
          partition: state.openedPartition,
          servicesList: [{ ...payload }],
        };
        state.optedServices.push(addedService);
      }
    },
    removeService: (state, { payload }) => {
      const optedServices = state.optedServices;
      state.quantAllServices--;

      if (state.openedPartition === SERVICE_CART) {
        removeServiceFromCart(optedServices, payload);
      } else {
        removeServiceFromOpenedPartitions(optedServices, state.openedPartition, payload);
      }
    },
    markOpenedPartition: (state, { payload }) => {
      state.openedPartition = payload;
    },
    saveAllServices: (state, { payload }) => {
      state.allServices = payload;
    },
  },
});

export const { addService, removeService, markOpenedPartition, saveAllServices } =
  servicesAppointmentSlice.actions;
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

export const selectOptedServiceById = (id) => {
  return (state) => {
    const servicesList = getServicesListByPartition(
      state.servicesAppointment.optedServices,
      state.servicesAppointment.openedPartition
    );

    if (servicesList.length) {
      return getServiceById(servicesList, id);
    }
    return false;
  };
};

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

function getServiceById(list, id) {
  return list.find((item) => item.id === id);
}
