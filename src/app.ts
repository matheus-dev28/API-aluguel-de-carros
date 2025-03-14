import "reflect-metadata";
import express from 'express';
import apiRouter from './route/apiRouter';
import { banco } from './banco';
import { 
    criarClientes, criarCarros, criarAluguel, 
    listarClientes, editarCliente, excluirCliente, obterCliente,
    listarCarros, editarCarro, excluirCarro, obterCarro,
    listarAlugueis, editarAluguel, excluirAluguel, obterAluguel, criarAluguelComVerificacao
} from './PreencherDados';

const app = express();
const port = 3000;

app.use(express.json());

let nomes = ["Joao da Silva", "Pedro Rocha", "Ana Santos"];

app.get('/', (req, res) => {
    res.json(nomes);
});

app.post('/', (req, res) => {
    const novoNome = req.body.nome;
    if (novoNome) {
        nomes.push(novoNome);
        res.status(201).json(nomes);
    } else {
        res.status(400).json({ mensagem: "Nome não fornecido" });
    }
});

app.use('/api', apiRouter);

app.listen(port, async () => {
    try {
        await banco.initialize();
        console.log("Conexão com o banco de dados efetuada com sucesso.");

        await criarClientes();
        await criarCarros();
        await criarAluguel();

        await listarClientes();
        await obterCliente(1);
        await editarCliente(1, { nome: "Renan", email: "renan@ufmt.br" });
        await excluirCliente(2);

        await listarCarros();
        await obterCarro(1);
        await editarCarro(1, { modelo: "AUDI RSQ8", ano: 2024});
        await excluirCarro(3);

        await listarAlugueis();
        await obterAluguel(1);
        await editarAluguel(1, { dataFim: new Date("2023-10-15") });
        await excluirAluguel(2);

        await criarAluguelComVerificacao(4, 4 , new Date("2023-12-01"), new Date("2023-12-10"));

        console.log(`Servidor rodando na porta ${port}`);
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
});