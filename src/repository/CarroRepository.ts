import { Repository } from 'typeorm';
import { Carro } from '../entity/Carro';
import { banco } from '../banco';

export class CarroRepository {
    private repositorio: Repository<Carro>;

    constructor() {
        this.repositorio = banco.getRepository(Carro);
    }

    async criar(carro: Carro): Promise<Carro> {
        return await this.repositorio.save(carro);
    }

    async listar(): Promise<Carro[]> {
        return await this.repositorio.find();
    }

    async obter(id: number): Promise<Carro | null> {
        return await this.repositorio.findOneBy({ id });
    }

    async editar(id: number, carro: Partial<Carro>): Promise<void> {
        await this.repositorio.update(id, carro);
    }

    async remover(carro: Carro): Promise<Carro> {
        return await this.repositorio.remove(carro);
    }
}