import { IsString, Length, Matches } from "class-validator";

export class FiscalCodeModel {
    @Length(6)
    @Matches(
        /^[A-Z]{6}$/,
        {message: 'Codice Fiscale Non Valido'}
        )
    @IsString()
    fiscalCode : string;
}