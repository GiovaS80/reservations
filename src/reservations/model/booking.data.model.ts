import { IsOptional, IsString, Length, Matches } from "class-validator";


export class BookindDataModel {
    @Matches(
        /^\d{4}-{1}\d{1,2}-{1}\d{1,2}$/,
        {message: 'Formato Data Non Valido. Inserire il formato Data: YYYY-MM-DD'}
        )
    @IsString()
    date : string;

    @Length(16)
    @Matches(
        /^\w{6}\d{2}\w{1}\d{2}\w{1}\d{3}\w{1}$/,
        {message: 'Codice Fiscale Non Valido'}
        )
    @IsString()
    fiscalCode: string;

    @IsString()
    @IsOptional()
    ticket?:string;

}
