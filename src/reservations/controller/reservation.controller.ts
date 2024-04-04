import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ValidatedBookingDataModel } from "../model/validated.booking.data.model";
import { ReservationDto } from "../DTO/reservation.dto";
import { BookindDataModel } from "../model/booking.data.model";

@Controller('reservations')
export class ReservationController{
    constructor(
        private reservationDto:ReservationDto,
    ){}

    // [GET] /reservations
    // http://localhost:3000/reservations
    // [GET] /reservations?date=<YYYY-MM-DD>
    // http://localhost:3000/reservations?date=2024-05-07
    // [GET] /reservations?fiscalCode=<YYYYYYYYYY>
    // http://localhost:3000/reservations?fiscalCode=MNCGNN80e07A662q
    // [GET] /reservations?ticket=<XXXXXXXXXX>
    // http://localhost:3000/reservations?ticket=7e367054-a021-4903-8636-f701d4b8d11a
    @Get()
    getReservations(@Query() queryParams:any):ValidatedBookingDataModel[]{
        return this.reservationDto.getReservations(queryParams);
    }

    // [POST] /reservations?date=<YYYY-MM-DD>&fiscalCode=<YYYYYYYYYY>
    // http://localhost:3000/reservations?date=2024-05-07&fiscalCode=MNCgnn80e07a662q
    @Post()
    newReservation(@Query() queryParams:BookindDataModel):ValidatedBookingDataModel{        
        return this.reservationDto.newReservation(queryParams);
    }

    // [DELETE] /reservations?date=<YYYY-MM-DD>&fiscalCode=<YYYYYYYYYY>&ticket=<XXXXXXXXXX>
    // http://localhost:3000/reservations?date=2024-05-07&fiscalCode=MNCgnn80e07a662q&ticket=7e367054-a021-4903-8636-f701d4b8d11a
    @Delete()
    deleteReservation(@Query() queryParams:BookindDataModel) : string {
        return this.reservationDto.deleteReservation(queryParams)
    }

}//end class ReservationController