import { Injectable } from "@nestjs/common";
import { IReservationRepository } from "./i.reservation.repository";
import { IReservationService } from "./i.reservation.service";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";
import { DateModel } from "../model/date.model";
import { ReservationModel } from "../model/reservation.model";
import { FiscalCodeModel } from "../model/fiscal.code.model";
import { TicketModel } from "../model/ticket.model";
import { ReservationRepository } from "./reservation.repository";

@Injectable()
export class ReservationService implements IReservationRepository, IReservationService{

    constructor(private reservationRepository: ReservationRepository){}

    private MAX_NUM_OF_APPOINTMENTS_DAILY : number = 5;
    BOOKING_DATA_EMPTY: ValidatedBookingDataModel = {
        date: new Date(),
        fiscalCode: '',
        ticket: '',
        message: 'Nessun Risultato Ottenuto',
        valid: false
    };
    
    getAllReservations() : ValidatedBookingDataModel[] {
        let reservations : ValidatedBookingDataModel[] = this.reservationRepository.getAllReservations();

        if(reservations.length === 0){
            reservations.push(this.BOOKING_DATA_EMPTY);
            return reservations;
        }
        reservations.sort((a:ReservationModel, b:ReservationModel) => {
            const aDateConvert = new Date(a.date);
            const bDateConvert = new Date(b.date);
            if(aDateConvert.toISOString() < bDateConvert.toISOString()) return -1;
            else if(aDateConvert.toISOString() > bDateConvert.toISOString()) return 1;
            else return 0;
        });

        reservations = reservations.map(function (reservation) {
            if(reservation['id']){
                reservation['ticket'] = reservation['id']; 
                delete reservation['id'];
            }
            return reservation;
        });

        return reservations;
    }//endg etAllReservations

    getReservationsByDate(date:DateModel):ValidatedBookingDataModel[] {
        const reservations: ValidatedBookingDataModel[] = this.getAllReservations();
        
        if(!('valid' in reservations[0])){
            let results : ReservationModel[] = reservations.filter((reservation) => {
                const reservationDateConvert = new Date(reservation.date);
                const dateConvert = new Date(date.date);

                if(reservationDateConvert.toDateString() === dateConvert.toDateString()) return reservation;
            })
            
            if(results.length === 0) {
                results.push(this.BOOKING_DATA_EMPTY);
                return results;
            }
            return results;
        }
        
        return reservations;
    }//end getReservationsByDate

    getReservationsByFiscalCode(fiscalCode: FiscalCodeModel): ValidatedBookingDataModel[] {
        const reservations: ValidatedBookingDataModel[] = this.getAllReservations();
        if(!('valid' in reservations[0])){
            let results : ReservationModel[] = reservations.filter((reservation) => {
                if(reservation.fiscalCode.toUpperCase() === fiscalCode.fiscalCode.toLocaleUpperCase()) return reservation;
            });
            if(results.length === 0) {
                results.push(this.BOOKING_DATA_EMPTY);
                return results;
            }
            return results;
        }
        return reservations;
    }//end getReservationsByFiscalCode

    getReservationByTicket(ticket: TicketModel): ValidatedBookingDataModel[] {
        const reservations: ValidatedBookingDataModel[] = this.getAllReservations();
        if(!('valid' in reservations[0])){
            let results : ReservationModel[] = reservations.filter((reservation) => {
                if(reservation.ticket === ticket.ticket) return reservation;
            });
            
            if(results.length === 0) {
                results.push(this.BOOKING_DATA_EMPTY);
                return results
            }
            return results;
        }
        return reservations;
    }//end getReservationByTicket

    newReservation(reservationData: ValidatedBookingDataModel): ValidatedBookingDataModel {
        reservationData = this.checkNewReservation(reservationData);
        if(reservationData.valid) reservationData = this.reservationRepository.newReservation(reservationData);
        else return reservationData;
        if(reservationData.valid) reservationData = this.getNewTicket(reservationData);
        return reservationData;
    }//end newReservation

    checkNewReservation(reservationData: ValidatedBookingDataModel): ValidatedBookingDataModel {
        const dateTest : DateModel = {
            date: reservationData.date.toDateString()
        };
        const reservationExtractByDate = this.getReservationsByDate(dateTest);
        
        if(
            !('valid' in reservationExtractByDate[0]) && 
            reservationExtractByDate.length >= this.MAX_NUM_OF_APPOINTMENTS_DAILY
            ){            
            reservationData.message =  `In data ${reservationData.date.toDateString()} ci sono troppi appuntamenti. Perfavore Scegliere un'altra data`;
            reservationData.valid = false;
            return reservationData;
        }
        else reservationData.valid = true;

        const reservationExtractByFiscalCode = this.getReservationsByFiscalCode(reservationData);
        
        if(!('valid' in reservationExtractByFiscalCode[0])){            
            const results : ReservationModel[] = reservationExtractByFiscalCode.filter((reservation) => {
                const reservationDateConvert = new Date(reservation.date);
                const dateToday = new Date();
                
                if(dateToday.toISOString() <= reservationDateConvert.toISOString()) return reservation;
            });
            
            if(results.length != 0){
                reservationData.valid = false;
                reservationData.message = `Si puo' avere solo una prenotazione attiva. Risulta esserci una prenotazione attiva in data ${results[0].date} `;
                return reservationData;
            }
            else reservationData.valid = true;
        }
        else {
            reservationData.message = `Paziente non registrato al sistema.`
            reservationData.valid = false;
        }
        
        return reservationData;
    }//end checkNewReservation

    getNewTicket(reservationData: ValidatedBookingDataModel): ValidatedBookingDataModel {
        const dateTest : DateModel = {
            date: reservationData.date.toDateString()
        };
        const reservationExtractByDate : ValidatedBookingDataModel[] = this.getReservationsByDate(dateTest);
        if(reservationExtractByDate.length === 0) {
            reservationData.message = `Problema nella memorizzazione`;
            reservationData.valid = false;
            return reservationData
        }
        let results : ValidatedBookingDataModel[] = reservationExtractByDate.filter((reservation: ValidatedBookingDataModel) => {
            if(reservation.fiscalCode === reservationData.fiscalCode) return reservation;
        });

        if(results.length === 0) {
            reservationData.valid = false;
            reservationData.message = 'Qualcosa non ha funzionato';
        }
        else {
            reservationData.message = ' Salvare il ticket per futuro controllo / cancellazione ';
            reservationData.ticket = results[0].ticket;
        }

        return reservationData;
    }//end getNewTicket

    deleteReservation(reservationData: ReservationModel): string {
        const reservation = this.getReservationByTicket(reservationData);
        
        if('valid' in reservation[0]) return 'Ticket NON Trovato';
        else if(reservation[0].fiscalCode != reservationData.fiscalCode) return `Il Codice Fiscale NON e' Corretto`;
        else{
            const reservationDateConvert = new Date(reservation[0].date);
            const dateConvert = new Date(reservationData.date);

            if(reservationDateConvert.toDateString() != dateConvert.toDateString()) return `La Data NON e' Corretto`;
        }
        return this.reservationRepository.deleteReservation(reservationData);
    }//end deleteReservation
    
}//end class ReservationService