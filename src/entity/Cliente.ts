import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    emDebito: boolean;

    constructor(nome?: string, email?: string, emDebito: boolean = false) {
        this.nome = nome || "";
        this.email = email || "";
        this.emDebito = emDebito;
    }
}