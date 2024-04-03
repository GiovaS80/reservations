import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";
import { ReservationDto } from "../DTO/reservation.dto";
import { BookindDataModel } from "../model/booking.data.model";
import { ReservationModel } from "../model/reservation.model";

@Controller('reservations')
export class ReservationController{
    constructor(
        private reservationDto:ReservationDto,
    ){}

    @Get()
    getReservations(@Query() queryParams:any):ValidatedBookingDataModel[]{
        if(Object.keys(queryParams).length === 0) return this.reservationDto.getAllReservations();
        else if(Object.keys(queryParams).length === 1){
            if('date' in queryParams) return this.reservationDto.getReservationsByDate(queryParams);
            else if('fiscalCode' in queryParams) return this.reservationDto.getReservationsByFiscalCode(queryParams);
            else if('ticket' in queryParams) return this.reservationDto.getReservationByTicket(queryParams);
            else return this.reservationDto.getGenericErrorParameter();
        }
        else return this.reservationDto.getGenericErrorParameter();
    }//end getReservations

    @Post()
    newReservation(@Query() queryParams:BookindDataModel):ValidatedBookingDataModel{        
        return this.reservationDto.newReservation(queryParams);
    }//end newReservation

    @Delete()
    deleteReservation(@Query() queryParams:BookindDataModel) : string {
        return this.reservationDto.deleteReservation(queryParams)
    }

}//end class ReservationController