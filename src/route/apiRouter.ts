import express from 'express';
import carroRouter from '../route/carroRouter';
import clienteRouter from '../route/clienteRouter';
import aluguelRouter from '../route/aluguelRouter';

const apiRouter = express.Router();

apiRouter.use('/carros', carroRouter);
apiRouter.use('/clientes', clienteRouter);
apiRouter.use('/alugueis', aluguelRouter);

export default apiRouter;