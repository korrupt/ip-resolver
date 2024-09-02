import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  JWT_SECRET: process.env['AUTH_JWT_SECRET'],
  JWT_EXPIRES_IN: process.env['AUTH_JWT_EXPIRES_IN'],
}))
