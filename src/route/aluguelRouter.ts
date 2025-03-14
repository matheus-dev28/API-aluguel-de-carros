import express from 'express';
import { AluguelController } from '../controller/AluguelController';

const aluguelRouter = express.Router();
const aluguelController = new AluguelController();

aluguelRouter.get('/', (req, res) => aluguelController.listar(req, res));
aluguelRouter.post('/', (req, res) => aluguelController.criar(req, res));
aluguelRouter.get('/:id', (req, res) => aluguelController.obter(req, res));
aluguelRouter.put('/:id', (req, res) => aluguelController.editar(req, res));
aluguelRouter.delete('/:id', (req, res) => aluguelController.remover(req, res));

export default aluguelRouter;