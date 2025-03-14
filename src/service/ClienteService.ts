import { ClienteRepository } from '../repository/ClienteRepository';
import { Cliente } from '../entity/Cliente';

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async criar(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.criar(cliente);
    }

    async listar(): Promise<Cliente[]> {
        return await this.clienteRepository.listar();
    }

    async obter(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.obter(id);
    }

    async editar(id: number, cliente: Partial<Cliente>): Promise<void> {
        await this.clienteRepository.editar(id, cliente);
    }

    async remover(id: number): Promise<boolean> {
        const cliente = await this.clienteRepository.obter(id);
        if (!cliente) {
            return false;
        }
        await this.clienteRepository.remover(cliente);
        return true;
    }

    async verificarDebito(id: number): Promise<boolean> {
        return await this.clienteRepository.verificarDebito(id);
    }
}