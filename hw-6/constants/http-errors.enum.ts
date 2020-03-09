/** HTTP Error code. */
enum HTTP_ERROR {
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_CREDENTIALS = 403,
}

export const JWT_SECRET = 'secret';

export default HTTP_ERROR;
