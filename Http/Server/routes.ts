import app from '../Server/bootstrap';

import todoRoutes from '../Routes/TodoRoutes';
import authRoutes from '../Routes/AuthRoutes';

const appVersion = '/api/v1';

app.use(`${appVersion}/todo`, todoRoutes);
app.use(`${appVersion}/auth`, authRoutes);

app.use('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    message: 'not found',
  });
});
