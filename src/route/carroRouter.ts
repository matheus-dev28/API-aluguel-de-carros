import express from 'express';
import { CarroController } from '../controller/CarroController';

const carroRouter = express.Router();
const carroController = new CarroController();

carroRouter.get('/', (req, res) => carroController.listar(req, res));
carroRouter.post('/', (req, res) => carroController.criar(req, res));
carroRouter.get('/:id', (req, res) => carroController.obter(req, res));
carroRouter.put('/:id', (req, res) => carroController.editar(req, res));
carroRouter.delete('/:id', (req, res) => carroController.remover(req, res));

export default carroRouter;