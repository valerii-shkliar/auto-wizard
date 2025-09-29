import { object, string } from 'yup';
import { regExpName, regExpPhone, regExpVinWithoutCharacters } from '../../../../constants/regExp';

export const validationSchemaAppointment = object({
  name: string()
    .matches(regExpName, '*Must be words')
    .min(2, '*Must be more 1 character')
    .required('*Enter your name'),
  phone: string()
    .min(10, '*Phone must be longer')
    .matches(regExpPhone, '*Must be a number')
    .required('*Enter your phone'),
  vin: string()
    .matches(regExpVinWithoutCharacters, '*Has not to be: "Q, I, O" or symbols')
    .min(17, '*Must be 17 characters')
    .max(17, '*Must be 17 characters'),
  millage: string('*Enter millage your vehicle').max(6, '*May be from 0 km to 999 999 km'),
  comment: string(),
});
