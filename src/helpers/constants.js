const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT:204,
  NOT_FOUND: 400,
  UNAUTHORIZED:401,
  FORBIDDEN:403,
  BAD_REQUEST: 404,
  CONFLICT:409,
  INTERNAL_SERVER_ERROR: 500,
};

const Subscription = {
  START: "start",
  PROFESSIONAL: "pro",
  BUISNESS: "buisness",
}
module.exports = {
  HttpCode,
  Subscription
};
