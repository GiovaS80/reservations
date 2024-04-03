import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ReservationController } from './reservations/controller/reservation.controller';
import { ReservationService } from './reservations/service/reservation.service';
import { ReservationDto } from './reservations/DTO/reservation.dto';
import { ReservationRepository } from './reservations/service/reservation.repository';

@Module({
  imports: [InMemoryDBModule],
  controllers: [
    AppController,
    ReservationController
  ],
  providers: [
    AppService,
    ReservationDto,
    ReservationService,
    ReservationRepository
  ],
})
export class AppModule {}
