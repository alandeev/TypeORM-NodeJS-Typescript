import { Router } from 'express';

import UserRoutes from '@modules/users/routers/UserRouters';
import SessionRoutes from '@modules/users/routers/SessionRouters';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);

export default routes;
