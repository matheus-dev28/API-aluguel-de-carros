import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Aluguel } from "./Aluguel";

@Entity()
export class Carro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    ano: number;

    @Column()
    disponivel: boolean;

    @OneToMany(() => Aluguel, aluguel => aluguel.carro)
    alugueis: Aluguel[];

    constructor(modelo?: string, ano?: number, disponivel: boolean = true) {
        this.modelo = modelo || "";
        this.ano = ano || new Date().getFullYear(); 
        this.disponivel = disponivel;
    }
}