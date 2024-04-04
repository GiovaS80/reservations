import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ReservationController } from './reservations/controller/reservation.controller';
import { ReservationService } from './reservations/service/reservation.service';
import { ReservationDto } from './reservations/DTO/reservation.dto';
import { ReservationRepository } from './reservations/service/reservation.repository';
import { PatientController } from './patients/controller/patient.controller';
import { PatientDto } from './patients/DTO/patient.DTO';
import { PatientService } from './patients/service/patient.service';
@Module({
  imports: [InMemoryDBModule],
  controllers: [
    AppController,
    ReservationController,
    PatientController
  ],
  providers: [
    AppService,
    ReservationDto,
    ReservationService,
    ReservationRepository,
    PatientDto,
    PatientService
  ],
})
export class AppModule {}
