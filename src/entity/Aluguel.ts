import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Carro } from "./Carro";
import { Cliente } from "./Cliente";

@Entity()
export class Aluguel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Carro, carro => carro.alugueis)
    carro: Carro;

    @ManyToOne(() => Cliente)
    cliente: Cliente;

    @Column()
    dataInicio: Date;

    @Column()
    dataFim: Date;

    constructor(carro?: Carro, cliente?: Cliente, dataInicio?: Date, dataFim?: Date) {
        this.carro = carro ||  new Carro();
        this.cliente = cliente || new Cliente();
        this.dataInicio = dataInicio || new Date();
        this.dataFim = dataFim || new Date();
    }
}