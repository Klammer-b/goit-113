import path from 'node:path';

export const TEMPLATE_DIR = path.join(process.cwd(), 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const PERMANENT_UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
