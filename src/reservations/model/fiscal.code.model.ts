import { IsString, Length, Matches } from "class-validator";

export class FiscalCodeModel {
    @Length(6)
    @Matches(
        /^\w{6}\d{2}\w{1}\d{2}\w{1}\d{3}\w{1}$/,
        {message: 'Codice Fiscale Non Valido'}
        )
    @IsString()
    fiscalCode : string;
}