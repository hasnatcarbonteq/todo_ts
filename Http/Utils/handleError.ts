import HttpException from '../../App/Infrastructure/Errors/HttpException';
import { z } from 'zod';
import logger from '../../App/Infrastructure/Logger'

const handleError = async (error, res, req) => {
  logger.error(error);

  if (error instanceof HttpException) {
    return res.status(error.status).send({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof z.ZodError) {
    const err = JSON.parse(error.message);
    return res.status(500).send({
      status: 'error',
      message: err[0].message || 'input validation error',
    });
  }

  return res
    .status(error.status && typeof error.status === 'number' ? error.status : 500)
    .send({
      status: 'error',
      message: error.message || 'unknown error',
    });
};

export default handleError;
