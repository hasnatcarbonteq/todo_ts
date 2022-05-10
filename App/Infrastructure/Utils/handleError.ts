import HttpException from '../../Infrastructure/Errors/HttpException';


const handleError = async (error, res, req) => {
  if (error instanceof HttpException) {
    return res.status(error.status).send({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(error.status && typeof error.status === 'number' ? error.status : 500).send({
    status: 'error',
    message: error.message || 'unknown error',
  });

};

export default handleError;
