import { ErrorRequestHandler } from 'express';
import { error, logger } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (_err, req, res, next) => {
  const err = error(_err.name, _err.message);

  const { log = {} } = _err;

  logger.error(JSON.stringify({
    ...log, endpoint: req.url, response: err, statusCode: err.status,
  }));

  return res.status(err.status).json(err);
};
