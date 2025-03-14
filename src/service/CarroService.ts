import { CarroRepository } from '../repository/CarroRepository';
import { Carro } from '../entity/Carro';

export class CarroService {
    private carroRepository: CarroRepository;

    constructor() {
        this.carroRepository = new CarroRepository();
    }

    async criar(carro: Carro): Promise<Carro> {
        return await this.carroRepository.criar(carro);
    }

    async listar(): Promise<Carro[]> {
        return await this.carroRepository.listar();
    }

    async obter(id: number): Promise<Carro | null> {
        return await this.carroRepository.obter(id);
    }

    // Método Editar
    async editar(id: number, carro: Partial<Carro>): Promise<void> {
        await this.carroRepository.editar(id, carro);
    }

    async remover(id: number): Promise<boolean> {
        const carro = await this.carroRepository.obter(id);
        if (!carro) {
            return false;
        }
        await this.carroRepository.remover(carro);
        return true;
    }
}