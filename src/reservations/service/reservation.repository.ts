import { Injectable } from "@nestjs/common";
import { DateModel } from "../model/date.model";
import { FiscalCodeModel } from "../model/fiscal.code.model";
import { ReservationModel } from "../model/reservation.model";
import { TicketModel } from "../model/ticket.model";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";
import { IReservationRepository } from "./i.reservation.repository";
import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { BookindDataModel } from "../model/booking.data.model";

@Injectable()
export class ReservationRepository implements IReservationRepository {

    constructor(
        private reservationDBService: InMemoryDBService<any>
    ){}

    getAllReservations(): ValidatedBookingDataModel[] {
        return this.reservationDBService.getAll();
    }

    getReservationsByDate(date: DateModel): ValidatedBookingDataModel[] {
        throw new Error("Method not implemented.");
    }

    getReservationsByFiscalCode(fiscalCode: FiscalCodeModel): ValidatedBookingDataModel[] {
        throw new Error("Method not implemented.");
    }

    getReservationByTicket(ticket: TicketModel): ValidatedBookingDataModel[] {
        throw new Error("Method not implemented.");
    }

    newReservation(reservationData: ValidatedBookingDataModel): ValidatedBookingDataModel {
        let bookingData: BookindDataModel;
        try {
            bookingData = {
                date: reservationData.date.toDateString(),
                fiscalCode: reservationData.fiscalCode,
            };
            this.reservationDBService.create(bookingData);
            reservationData.valid = true;
            reservationData.message += 'check if the database has recorded -';
        } catch (error) {
            reservationData.valid = false;
            reservationData.message = error.message;
        }
        return reservationData;
    }

    deleteReservation(reservationData: ReservationModel): string {
        try {
            this.reservationDBService.delete(reservationData.ticket);
        } catch (error) {
            return error.message;
        }
        // this.reservationDBService.delete(reservationData.ticket);
        return 'Cancellazione avvenuta';
    }

}//end class ReservationRepository