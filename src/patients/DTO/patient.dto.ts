import { Injectable } from "@nestjs/common";
import { PatientModel } from "../model/patient.model";
import { PatientService } from "../service/patient.service";
import { IPatientInterface } from "../model/i.patient.model";

@Injectable()
export class PatientDto{
    constructor(private patientService: PatientService){}

    newPatient(queryParams:PatientModel):PatientModel{
        queryParams = this.isFiscalCodeValid(queryParams);
        queryParams = this.getPatient(queryParams, true);
        
        if(queryParams.valid) queryParams = this.patientService.newPatient(queryParams);
        else return queryParams;

        if(queryParams.valid) queryParams = this.getPatient(queryParams, false);
        else return queryParams;

        // this.getPatient(queryParams);
        return queryParams;
    }

    isFiscalCodeValid(validatedBookingData:PatientModel):PatientModel{
        const fiscalCodeRegEx = new RegExp(/^[A-Z]{6}\d{2}[A-Z]{1}\d{2}[A-Z]{1}\d{3}[A-Z]{1}$/);
        validatedBookingData.fiscalCode = validatedBookingData.fiscalCode.toUpperCase();
        validatedBookingData.valid = fiscalCodeRegEx.test(validatedBookingData.fiscalCode);
        if(validatedBookingData.valid) validatedBookingData.message = 'Codice Fiscale Validato - ';
        else validatedBookingData.message = 'Controllare il Codice Fiscale';
        return validatedBookingData
    }//end isFiscalCodeValid

    getPatient(validatedBookingData:PatientModel, checkIsPresent:boolean):PatientModel{
        const patients = this.patientService.getAll();
        let result = []
        if(patients.length != 0){
            result = patients.filter((patient) => {
                if(patient.fiscalCode === validatedBookingData.fiscalCode) return patient
            })
        }
        if(checkIsPresent && result.length === 0) return validatedBookingData
        else if(checkIsPresent){
            validatedBookingData.valid = false;
            validatedBookingData.message = 'Paziente gia registrato';
            if('id' in result[0]) validatedBookingData.ticket = result[0].id;
            else validatedBookingData.ticket = result[0].ticket            
        }
        else {
            let resultId : IPatientInterface[] = result.filter((patient) => {
                if('name' in patient) return patient;
            })
            validatedBookingData.message = `il ticket ${resultId[0].id} e' il tuo id personale`
            validatedBookingData.ticket = resultId[0].id;
        }
        
        return validatedBookingData
    }//end getPatient
    
}//end class PatientDto