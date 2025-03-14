import express from 'express';
import { ClienteController } from '../controller/ClienteController';

const clienteRouter = express.Router();
const clienteController = new ClienteController();

clienteRouter.get('/', (req, res) => clienteController.listar(req, res));
clienteRouter.post('/', (req, res) => clienteController.criar(req, res));
clienteRouter.get('/:id', (req, res) => clienteController.obter(req, res));
clienteRouter.put('/:id', (req, res) => clienteController.editar(req, res));
clienteRouter.delete('/:id', (req, res) => clienteController.remover(req, res));

export default clienteRouter;