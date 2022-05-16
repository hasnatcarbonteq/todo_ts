import AuthService from '@infrastructure/Services/AuthService';

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const decoded: any = await AuthService.decodeJWT(token);
    const signatureFailed = !!decoded === false;

    if (signatureFailed) {
      throw Error('signatureFailed');
    }

    req.decoded = decoded;

    return next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

export default auth;
