/** HTTP Error code. */
export enum HTTP_ERROR {
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_CREDENTIALS = 403,
}

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRATION_TIME_MS = process.env.JWT_EXPIRATION_TIME_MS || 10;
export const JWT_HTTP_HEADER_KEY = 'x-access-token';
