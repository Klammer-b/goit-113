import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/genders.js';
import { User } from './user.js';

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
    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Student = model('student', studentSchema);
