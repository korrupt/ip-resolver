import { registerAs } from "@nestjs/config";

export default registerAs('postgres', () => ({
  HOST: process.env['POSTGRES_HOST'],
  PORT: parseInt(process.env['POSTGRES_PORT'] || '5431'),
  USER: process.env['POSTGRES_USER'],
  PASSWORD: process.env['POSTGRES_PASSWORD'],
  DB: process.env['POSTGRES_DB'],
  SYNC: process.env['POSTGRES_SYNC'] == 'true'
}));
