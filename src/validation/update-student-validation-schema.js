import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';
import { isValidObjectId } from 'mongoose';

export const updateStudentValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30),
  // .when('lastName', { is: Joi.required(), then: Joi.required() }),
  lastName: Joi.string().alphanum().min(2).max(30),
  // .when('firstName', { is: Joi.required(), then: Joi.required() }),
  avgMark: Joi.number().min(1).max(12),
  age: Joi.number().integer().min(6).max(18),
  gender: Joi.valid(...Object.values(GENDERS)),
  onDuty: Joi.bool(),
  parentId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('Not valid mongo objectId');
    }

    return value;
  }),
}).and('lastName', 'firstName');
