import { Request, Response } from 'express';
import { CarroService } from '../service/CarroService';

export class CarroController {
    private carroService: CarroService;

    constructor() {
        this.carroService = new CarroService();
    }

    async listar(req: Request, res: Response): Promise<Response> {
        const carros = await this.carroService.listar();
        return res.json(carros);
    }

    async criar(req: Request, res: Response): Promise<Response> {
        const carro = await this.carroService.criar(req.body);
        return res.status(201).json(carro);
    }

    async obter(req: Request, res: Response): Promise<Response> {
        const carro = await this.carroService.obter(parseInt(req.params.id));
        return carro ? res.json(carro) : res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    async editar(req: Request, res: Response): Promise<Response> {
        await this.carroService.editar(parseInt(req.params.id), req.body);
        return res.status(200).json({ mensagem: "Carro atualizado com sucesso" });
    }

    async remover(req: Request, res: Response): Promise<Response> {
        const sucesso = await this.carroService.remover(parseInt(req.params.id));
        return sucesso ? res.status(200).json({ mensagem: "Carro removido com sucesso" }) : res.status(404).json({ mensagem: "Carro não encontrado" });
    }
}

