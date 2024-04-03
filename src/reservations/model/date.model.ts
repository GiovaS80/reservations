import { IsDate, IsInt, IsString, Matches } from "class-validator";

export class DateModel {
    @Matches(
        /^\d{4}-{1}\d{1,2}-{1}\d{1,2}$/,
        {message: 'Formato Data Non Valido. Inserire il formato Data: YYYY-MM-DD'}
        )
    @IsString()
    date : string;
}