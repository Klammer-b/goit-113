import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/roles.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: ROLES.PARENT,
      enum: Object.values(ROLES),
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

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

export const User = model('user', userSchema);
