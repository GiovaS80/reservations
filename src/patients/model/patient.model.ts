import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PatientModel  {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    fiscalCode: string;

    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsOptional()
    ticket: string;

    @IsString()
    @IsOptional()
    date: string;

    @IsBoolean()
    @IsOptional()
    valid: boolean;
}