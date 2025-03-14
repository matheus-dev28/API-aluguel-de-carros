import { Request, Response } from 'express';
import { ClienteService } from '../service/ClienteService';

export class ClienteController {
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    async listar(req: Request, res: Response): Promise<Response> {
        const clientes = await this.clienteService.listar();
        return res.json(clientes);
    }

    async criar(req: Request, res: Response): Promise<Response> {
        const cliente = await this.clienteService.criar(req.body);
        return res.status(201).json(cliente);
    }

    async obter(req: Request, res: Response): Promise<Response> {
        const cliente = await this.clienteService.obter(parseInt(req.params.id));
        return cliente ? res.json(cliente) : res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    async editar(req: Request, res: Response): Promise<Response> {
        await this.clienteService.editar(parseInt(req.params.id), req.body);
        return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
    }

    async remover(req: Request, res: Response): Promise<Response> {
        const sucesso = await this.clienteService.remover(parseInt(req.params.id));
        return sucesso ? res.status(200).json({ mensagem: "Cliente removido com sucesso" }) : res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
}