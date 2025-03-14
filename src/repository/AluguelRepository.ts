import { Repository } from 'typeorm';
import { Aluguel } from '../entity/Aluguel';
import { banco } from '../banco';

export class AluguelRepository {
    private repositorio: Repository<Aluguel>;

    constructor() {
        this.repositorio = banco.getRepository(Aluguel);
    }

    async criar(aluguel: Aluguel): Promise<Aluguel> {
        return await this.repositorio.save(aluguel);
    }

    async listar(): Promise<Aluguel[]> {
        return await this.repositorio.find({ relations: ["carro", "cliente"] });
    }

    async obter(id: number): Promise<Aluguel | null> {
        return await this.repositorio.findOne({ where: { id }, relations: ["carro", "cliente"] });
    }

    async editar(id: number, aluguel: Partial<Aluguel>): Promise<void> {
        await this.repositorio.update(id, aluguel);
    }

    async remover(aluguel: Aluguel): Promise<Aluguel> {
        return await this.repositorio.remove(aluguel);
    }
}