import Joi from 'joi';
import { GENDERS } from '../constants/genders.js';
import { isValidObjectId } from 'mongoose';

export const createStudentValidationSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(30).required(),
  avgMark: Joi.number().required().min(1).max(12),
  age: Joi.number().required().integer().min(6).max(18),
  gender: Joi.required().valid(...Object.values(GENDERS)),
  onDuty: Joi.bool(),
  parentId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('Not valid mongo objectId');
    }

    return value;
  }),
});
