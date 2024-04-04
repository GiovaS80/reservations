import { Controller, Get, Post, Query } from "@nestjs/common";
import { PatientModel } from "../model/patient.model";
import { PatientDto } from "../DTO/patient.DTO";

@Controller('patient')
export class PatientController{
    constructor(private patientDto: PatientDto){}
    @Post()
    newPatient(@Query() queryParams:PatientModel):PatientModel{
        queryParams = this.patientDto.newPatient(queryParams);
        return queryParams;
    }
    @Get()
    test():string{
        return 'ok da test'
    }
}