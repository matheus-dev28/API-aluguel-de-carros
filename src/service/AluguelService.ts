import { AluguelRepository } from '../repository/AluguelRepository';
import { ClienteService } from './ClienteService';
import { CarroService } from './CarroService';
import { Aluguel } from '../entity/Aluguel';

export class AluguelService {
    private aluguelRepository: AluguelRepository;
    private clienteService: ClienteService;
    private carroService: CarroService;

    constructor() {
        this.aluguelRepository = new AluguelRepository();
        this.clienteService = new ClienteService();
        this.carroService = new CarroService();
    }

    async criar(aluguel: Aluguel): Promise<string | Aluguel> {
        const clienteEmDebito = await this.clienteService.verificarDebito(aluguel.cliente.id);
        
        if (clienteEmDebito) {
            return "Cliente possui débitos pendentes e não pode realizar novos aluguéis.";
        }
    
        const carro = await this.carroService.obter(aluguel.carro.id);
        if (!carro || !carro.disponivel) {
            return "Carro não está disponível para aluguel.";
        }
    
        carro.disponivel = false;
        await this.carroService.editar(carro.id, { disponivel: false });
    
        return await this.aluguelRepository.criar(aluguel);
    }

    async listar(): Promise<Aluguel[]> {
        return await this.aluguelRepository.listar();
    }

    async obter(id: number): Promise<Aluguel | null> {
        return await this.aluguelRepository.obter(id);
    }

    async editar(id: number, aluguel: Partial<Aluguel>): Promise<void> {
        await this.aluguelRepository.editar(id, aluguel);
    }

    async remover(id: number): Promise<boolean> {
        const aluguel = await this.aluguelRepository.obter(id);
        if (!aluguel) return false;
        
        const carro = aluguel.carro;
        carro.disponivel = true;
        await this.carroService.editar(carro.id, { disponivel: true });
        
        await this.aluguelRepository.remover(aluguel);
        return true;
    }
}