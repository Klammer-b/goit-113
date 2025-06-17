import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/genders.js';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avgMark: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(GENDERS),
    },
    age: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Student = model('student', studentSchema);
