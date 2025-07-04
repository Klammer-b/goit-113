import cloudinary from 'cloudinary';
import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

cloudinary.v2.config({
  cloud_name: getEnvVar(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVar(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);

    return response.secure_url;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to upload image to cloudinary');
  }
};
