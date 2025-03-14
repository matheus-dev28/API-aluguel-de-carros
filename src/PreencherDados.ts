import { ClienteService } from './service/ClienteService';
import { CarroService } from './service/CarroService';
import { AluguelService } from './service/AluguelService';
import { Carro } from './entity/Carro';
import { Cliente } from './entity/Cliente';
import { Aluguel } from './entity/Aluguel';

const clienteService = new ClienteService();
const carroService = new CarroService();
const aluguelService = new AluguelService();

export async function criarClientes() {
    const cliente1 = new Cliente("João Silva", "joao.silva@hotmail.com", false);
    const cliente2 = new Cliente("Maria Souza", "maria.souza@hotmail.com", true);
    const cliente3 = new Cliente("Theo Ramos", "theo.ramos@hotmail.com", false);
    const cliente4 = new Cliente("Matheus Henrique", "matheus.henrique@hotmail.com", true);
    const cliente5 = new Cliente("Brunno Henrique", "brunno.henrique@hotmail.com", false);

    await clienteService.criar(cliente1);
    await clienteService.criar(cliente2);
    await clienteService.criar(cliente3);
    await clienteService.criar(cliente4);
    await clienteService.criar(cliente5);
}

export async function listarClientes() {
    const clientes = await clienteService.listar();
    console.log("Lista de clientes:", clientes);
}

export async function editarCliente(id: number, novosDados: Partial<Cliente>) {
    await clienteService.editar(id, novosDados);
    const clienteAtualizado = await clienteService.obter(id);
    console.log(`Cliente com ID ${id} atualizado:`, clienteAtualizado);
}

export async function excluirCliente(id: number) {
    const alugueis = await aluguelService.listar();
    const alugueisCliente = alugueis.filter(aluguel => aluguel.cliente.id === id);

    for (const aluguel of alugueisCliente) {
        await aluguelService.remover(aluguel.id);
    }

    const sucesso = await clienteService.remover(id);
    console.log(sucesso ? `Cliente com ID ${id} removido.` : "Cliente não encontrado.");
}

export async function obterCliente(id: number) {
    const cliente = await clienteService.obter(id);
    console.log(cliente ? `Cliente encontrado: ${cliente}` : "Cliente não encontrado.");
}

export async function criarCarros() {
    const carro1 = new Carro("Fiat Uno", 2015, true);
    const carro2 = new Carro("Volkswagen Gol", 2018, true);
    const carro3 = new Carro("Hyundai Hb20", 2020, true);
    const carro4 = new Carro("Toyota Corolla", 2024, true);
    const carro5 = new Carro("Honda Civic", 2024, true);

    await carroService.criar(carro1);
    await carroService.criar(carro2);
    await carroService.criar(carro3);
    await carroService.criar(carro4);
    await carroService.criar(carro5);
}

export async function listarCarros() {
    const carros = await carroService.listar();
    console.log("Lista de carros:", carros);
}

export async function editarCarro(id: number, novosDados: Partial<Carro>) {
    await carroService.editar(id, novosDados);
    const carroAtualizado = await carroService.obter(id);
    console.log(`Carro com ID ${id} atualizado:`, carroAtualizado);
}

export async function excluirCarro(id: number) {
    const sucesso = await carroService.remover(id);
    console.log(sucesso ? `Carro com ID ${id} removido.` : "Carro não encontrado.");
}

export async function obterCarro(id: number) {
    const carro = await carroService.obter(id);
    console.log(carro ? `Carro encontrado: ${carro}` : "Carro não encontrado.");
}

export async function criarAluguel() {
    const carro = await carroService.obter(1);
    const cliente = await clienteService.obter(1); 

    if (carro && cliente) {
        const dataInicio = new Date("2023-10-01");
        const dataFim = new Date("2023-10-10");

        const aluguel = new Aluguel(carro, cliente, dataInicio, dataFim);
        await aluguelService.criar(aluguel);
        console.log("Aluguel criado:", aluguel);
    } else {
        console.log("Carro ou Cliente não encontrado.");
    }

    const carro2 = await carroService.obter(2); 
    const cliente2 = await clienteService.obter(2); 

    if (carro2 && cliente2) {
        const dataInicio2 = new Date("2023-11-01");
        const dataFim2 = new Date("2023-11-10");

        const aluguel2 = new Aluguel(carro2, cliente2, dataInicio2, dataFim2);
        await aluguelService.criar(aluguel2);
        console.log("Segundo aluguel criado:", aluguel2);
    } else {
        console.log("Carro ou Cliente não encontrado para o segundo aluguel.");
    }
}

export async function criarAluguelComVerificacao(clienteId: number, carroId: number, dataInicio: Date, dataFim: Date) {
    const clienteEmDebito = await clienteService.verificarDebito(clienteId);

    if (clienteEmDebito) {
        console.log("Cliente com débito pendente; aluguel não permitido.");
        return;
    }

    const carro = await carroService.obter(carroId);
    const cliente = await clienteService.obter(clienteId);

    if (carro && cliente) {
        const aluguel = new Aluguel(carro, cliente, dataInicio, dataFim);
        const aluguelCriado = await aluguelService.criar(aluguel);
        console.log("Aluguel criado com sucesso:", aluguelCriado);
    } else {
        console.log("Carro ou Cliente não encontrado.");
    }
}

export async function listarAlugueis() {
    const alugueis = await aluguelService.listar();
    console.log("Lista de aluguéis:", alugueis);
}

export async function editarAluguel(id: number, novosDados: Partial<Aluguel>) {
    await aluguelService.editar(id, novosDados);
    const aluguelAtualizado = await aluguelService.obter(id);
    console.log(`Aluguel com ID ${id} atualizado:`, aluguelAtualizado);
}

export async function excluirAluguel(id: number) {
    const sucesso = await aluguelService.remover(id);
    console.log(sucesso ? `Aluguel com ID ${id} removido.` : "Aluguel não encontrado.");
}

export async function obterAluguel(id: number) {
    const aluguel = await aluguelService.obter(id);
    console.log(aluguel ? `Aluguel encontrado: ${aluguel}` : "Aluguel não encontrado.");
}