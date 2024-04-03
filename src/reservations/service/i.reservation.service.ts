import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";

export interface IReservationService{
    checkNewReservation(reservation:ValidatedBookingDataModel):ValidatedBookingDataModel;
}