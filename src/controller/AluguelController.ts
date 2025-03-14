import { Request, Response } from 'express';
import { AluguelService } from '../service/AluguelService';

export class AluguelController {
    private aluguelService: AluguelService;

    constructor() {
        this.aluguelService = new AluguelService();
    }

    async listar(req: Request, res: Response): Promise<Response> {
        const alugueis = await this.aluguelService.listar();
        return res.json(alugueis);
    }

    async criar(req: Request, res: Response): Promise<Response> {
        const resultado = await this.aluguelService.criar(req.body);
        if (typeof resultado === "string") {
            return res.status(400).json({ mensagem: resultado });
        }
        return res.status(201).json(resultado);
    }

    async obter(req: Request, res: Response): Promise<Response> {
        const aluguel = await this.aluguelService.obter(parseInt(req.params.id));
        return aluguel ? res.json(aluguel) : res.status(404).json({ mensagem: "Aluguel não encontrado" });
    }

    async editar(req: Request, res: Response): Promise<Response> {
        await this.aluguelService.editar(parseInt(req.params.id), req.body);
        return res.status(200).json({ mensagem: "Aluguel atualizado com sucesso" });
    }

    async remover(req: Request, res: Response): Promise<Response> {
        const sucesso = await this.aluguelService.remover(parseInt(req.params.id));
        return sucesso ? res.status(200).json({ mensagem: "Aluguel removido com sucesso" }) : res.status(404).json({ mensagem: "Aluguel não encontrado" });
    }
}