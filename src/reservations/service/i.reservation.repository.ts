import { BookindDataModel } from "../model/booking.data.model";
import { DateModel } from "../model/date.model";
import { FiscalCodeModel } from "../model/fiscal.code.model";
import { ReservationModel } from "../model/reservation.model";
import { TicketModel } from "../model/ticket.model";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";

export interface IReservationRepository {
    getAllReservations():ValidatedBookingDataModel[];
    getReservationsByDate(date:DateModel):ValidatedBookingDataModel[];
    getReservationsByFiscalCode(fiscalCode:FiscalCodeModel):ValidatedBookingDataModel[];
    getReservationByTicket(ticket:TicketModel):ValidatedBookingDataModel[];
    newReservation(reservationData:ValidatedBookingDataModel):ValidatedBookingDataModel;
    deleteReservation(reservationData:ReservationModel):string;
}//end interface IReservationRepository