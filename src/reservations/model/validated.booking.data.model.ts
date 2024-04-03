import { IsBoolean, IsDate, IsString, Length, Matches } from "class-validator";

export class ValidatedBookingDataModel {
    @IsDate()
    date : Date;

    @Length(6)
    @Matches(
        /^[A-Z]{6}$/,
        {message: 'Codice Fiscale Non Valido'}
        )
    @IsString()
    fiscalCode : string;

    @IsString()
    ticket: string;

    @IsString()
    message?: string;

    @IsBoolean()
    valid?: boolean;
}//end class ValidatedBookingDataModel

export const ValidatedBookingDataModelEmpty: ValidatedBookingDataModel = {
    date: new Date(),
    fiscalCode: '',
    ticket: '',
    message: 'Nessun Risultato Ottenuto',
    valid: false
}