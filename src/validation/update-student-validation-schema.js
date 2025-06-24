import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';

export const updateStudentValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30),
  // .when('lastName', { is: Joi.required(), then: Joi.required() }),
  lastName: Joi.string().alphanum().min(2).max(30),
  // .when('firstName', { is: Joi.required(), then: Joi.required() }),
  avgMark: Joi.number().min(1).max(12),
  age: Joi.number().integer().min(6).max(18),
  gender: Joi.valid(...Object.values(GENDERS)),
  onDuty: Joi.bool(),
}).and('lastName', 'firstName');
