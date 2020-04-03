export const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRATION_TIME_MS = process.env.JWT_EXPIRATION_TIME_MS || 10;
export const JWT_HTTP_HEADER_KEY =
    process.env.JWT_HTTP_HEADER_KEY || 'x-access-token';