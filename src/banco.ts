import { DataSource } from "typeorm";
import { Aluguel } from "./entity/Aluguel";
import { Carro } from "./entity/Carro";
import { Cliente } from "./entity/Cliente";

export const banco = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "grupinho10",
    database: "typeorm",
    entities: [Aluguel, Carro, Cliente],
    synchronize: true,
    dropSchema: false,
    logging: true
});

banco.initialize();