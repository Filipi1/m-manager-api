import { Router } from 'express';

const routes = Router();

routes.use('/', (request, response) => {
    return response.json({message: 'Money Manager'})
});

export default routes;