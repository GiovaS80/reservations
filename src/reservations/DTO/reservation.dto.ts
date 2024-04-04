import { Injectable } from "@nestjs/common";
import { DateModel } from "../model/date.model";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";
import { ReservationService } from "../service/reservation.service";
import { BookindDataModel } from "../model/booking.data.model";
import { FiscalCodeModel } from "../model/fiscal.code.model";
import { TicketModel } from "../model/ticket.model";

@Injectable()
export class ReservationDto{
    constructor(
        private reservationService: ReservationService
    ){}

    BOOKINGPROCESS: string = 'BookingProcess';
    BOOKING_DATA_EMPTY: ValidatedBookingDataModel = {
        date: new Date(),
        fiscalCode: '',
        ticket: '',
        message: 'Nessun Risultato Ottenuto',
        valid: false
    }

    getReservations(queryParams:any):ValidatedBookingDataModel[] {
        if(Object.keys(queryParams).length === 0) return this.getAllReservations();
        else if(Object.keys(queryParams).length === 1){
            if('date' in queryParams) return this.getReservationsByDate(queryParams);
            else if('fiscalCode' in queryParams) return this.getReservationsByFiscalCode(queryParams);
            else if('ticket' in queryParams) return this.getReservationByTicket(queryParams);
            else return this.getGenericErrorParameter();
        }
        else return this.getGenericErrorParameter();
    }//end getReservations

    getAllReservations():ValidatedBookingDataModel[] {
        return this.reservationService.getAllReservations();
    }
    

    getReservationsByDate(date:DateModel):ValidatedBookingDataModel[]{
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        let reservations:ValidatedBookingDataModel[] = [];

        bookingData = this.isDateValid(date.date, bookingData);
        
        if(bookingData.valid) {
            reservations = this.reservationService.getReservationsByDate(date);
            return reservations;
        }
        else {
            reservations.push(bookingData);
            return reservations;
        }
    }//end getReservationsByDate

    getReservationsByFiscalCode(fiscalCode: FiscalCodeModel): ValidatedBookingDataModel[] {
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        let reservations:ValidatedBookingDataModel[] = [];

        bookingData.fiscalCode = fiscalCode.fiscalCode.toUpperCase();
        bookingData = this.isFiscalCodeValid(bookingData);
        if(bookingData.valid){
            reservations = this.reservationService.getReservationsByFiscalCode(bookingData);
            return reservations;
        }
        else {
            reservations.push(bookingData);
            return reservations;
        }
    }//end getReservationsByFiscalCode

    getReservationByTicket(ticket: TicketModel): ValidatedBookingDataModel[]{
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        let reservations:ValidatedBookingDataModel[] = [];
        bookingData.ticket = ticket.ticket;
        bookingData = this.isTicketValid(bookingData);
        if(bookingData.valid){
            reservations = this.reservationService.getReservationByTicket(bookingData);
            return reservations;
        }
        else {
            reservations.push(bookingData);
            return reservations;
        }
    }//end getReservationByTicket

    getGenericErrorParameter():ValidatedBookingDataModel[]{
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        let reservations:ValidatedBookingDataModel[] = [];
        bookingData.message = 'I Parametri di ricerca inseriti non sono corretti. ';
        reservations.push(bookingData);

        return reservations;
    }//end getGenericErrorParameter

    newReservation(queryParams:BookindDataModel):ValidatedBookingDataModel{
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        bookingData.message = this.BOOKINGPROCESS;

        bookingData = this.isDateValid(queryParams.date, bookingData);

        if(bookingData.valid) {
            bookingData.fiscalCode = queryParams.fiscalCode.toUpperCase();
            bookingData.message += 'Codice Fiscale Valido - ';
            bookingData = this.reservationService.newReservation(bookingData);
        }
        
        return bookingData;
    }//end newReservation

    isDateValid(date:string, validatedBookingData:ValidatedBookingDataModel):ValidatedBookingDataModel{        
        try {
            const dateRegExp = new RegExp(/^\d{4}-{1}\d{1,2}-{1}\d{1,2}$/);
            validatedBookingData.valid = dateRegExp.test(date);
            if(validatedBookingData.valid){
                const dateValid = new Date(date);
                const dayWeek = dateValid.getDay();
                const dateToday = new Date();
                const limitDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

                if(isNaN(dateValid.getTime())) throw new Error('Data NON Valida');
                
                if(
                    validatedBookingData.message === this.BOOKINGPROCESS &&
                    dateValid.toISOString() <= dateToday.toISOString()
                    ) throw new Error('Data NON Valida. Non si puo prenotare in data odierna o una data nel passato');
    
                if(dateValid.toISOString() >= limitDate.toISOString()) throw new Error('Data NON Valida. Troppo nel Futuro Non abbiamo ancora l agenda per questa data');

                if(dayWeek === 0 || dayWeek === 6)  throw new Error('Data NON Valida. Non prendiamo appuntamenti durante il week-end');

                validatedBookingData.date = dateValid;
                validatedBookingData.message = 'Data Valida - ';
                validatedBookingData.valid = true;
            }
            else throw new Error('Formato Data Non Valido. Inserire il formato Data: YYYY-MM-DD');
        } catch (error) {
            validatedBookingData.message = error.message;
            validatedBookingData.valid = false;
        }
        return validatedBookingData;
    }//end isDateValid

    isFiscalCodeValid(validatedBookingData:ValidatedBookingDataModel):ValidatedBookingDataModel{
        const fiscalCodeRegEx = new RegExp(/^[A-Z]{6}\d{2}[A-Z]{1}\d{2}[A-Z]{1}\d{3}[A-Z]{1}$/);
        validatedBookingData.valid = fiscalCodeRegEx.test(validatedBookingData.fiscalCode);
        if(validatedBookingData.valid) validatedBookingData.message += 'Codice Fiscale Validato - ';
        else validatedBookingData.message = 'Controllare il Codice Fiscale';
        return validatedBookingData
    }//end isFiscalCodeValid

    isTicketValid(ticketReservation:ValidatedBookingDataModel): ValidatedBookingDataModel{
        const ticketRegEx = new RegExp(/^\w{8}-{1}\w{4}-{1}\w{4}-{1}\w{4}-{1}\w{12}$/);
        ticketReservation.valid = ticketRegEx.test(ticketReservation.ticket);
        if(ticketReservation.valid) ticketReservation.message = `Ticket Validato - `;
        else ticketReservation.message = `Ticket NON valido. Il Ticket e' un codice alfanumerico, con lettere maiuscole minuscole e numeri, formato cosi: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'`;
        return ticketReservation;
    }//end isTicketValid

    deleteReservation(queryParams: BookindDataModel): string {
        if(Object.keys(queryParams).length != 3) return `Sono necessari 3 parametri: Data, Codice Fiscale e Ticket`;

        if(!('ticket' in queryParams)) return `Manca il ticket`;
        let bookingData : ValidatedBookingDataModel = this.BOOKING_DATA_EMPTY;
        bookingData = this.isDateValid(queryParams.date, bookingData);

        if(!bookingData.valid) return bookingData.message;

        bookingData.fiscalCode = queryParams.fiscalCode.toUpperCase();
        bookingData = this.isFiscalCodeValid(bookingData);
        
        if(!bookingData.valid) return bookingData.message;

        bookingData.ticket = queryParams.ticket;
        bookingData = this.isTicketValid(bookingData);
        if(!bookingData.valid) return bookingData.message;

        return this.reservationService.deleteReservation(bookingData);
    }

}//end class ReservationDto