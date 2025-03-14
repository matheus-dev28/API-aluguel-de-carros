import { Repository } from 'typeorm';
import { Cliente } from '../entity/Cliente';
import { banco } from '../banco';

export class ClienteRepository {
    private repositorio: Repository<Cliente>;

    constructor() {
        this.repositorio = banco.getRepository(Cliente);
    }

    async criar(cliente: Cliente): Promise<Cliente> {
        return await this.repositorio.save(cliente);
    }

    async listar(): Promise<Cliente[]> {
        return await this.repositorio.find();
    }

    async obter(id: number): Promise<Cliente | null> {
        return await this.repositorio.findOneBy({ id });
    }

    async editar(id: number, cliente: Partial<Cliente>): Promise<void> {
        await this.repositorio.update(id, cliente);
    }

    async remover(cliente: Cliente): Promise<Cliente> {
        return await this.repositorio.remove(cliente);
    }

    async verificarDebito(id: number): Promise<boolean> {
        const cliente = await this.repositorio.findOneBy({ id });
        return cliente ? cliente.emDebito : false;
    }
}