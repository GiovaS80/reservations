import { Injectable } from "@nestjs/common";
import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { IPatientService } from "./i.patient.service";
import { PatientModel } from "../model/patient.model";
import { IPatientInterface } from "../model/i.patient.model";

@Injectable()
export class PatientService implements IPatientService{

    constructor(private reservationDBService: InMemoryDBService<IPatientInterface>){}

    getAll(): IPatientInterface[] {
        return this.reservationDBService.getAll()
    }

    newPatient(patientData: PatientModel):PatientModel {        
        try {
            const patient  = {
                name: patientData.name,
                surname: patientData.surname,
                fiscalCode: patientData.fiscalCode,
                date: new Date().toDateString()
            }
            this.reservationDBService.create(patient);
            patientData.valid = true;            
            return patientData;
        } catch (error) {            
            patientData.valid = false;
            patientData.message = error.message;
            return patientData;
        }
    }
    
}//end class PatientService