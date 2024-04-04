import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface IPatientInterface extends InMemoryDBEntity{
    name: string;
    surname: string;
    fiscalCode: string;
    date: string;
    ticket: string;
}