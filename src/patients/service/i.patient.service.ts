import { IPatientInterface } from "../model/i.patient.model";
import { PatientModel } from "../model/patient.model";

export interface IPatientService{
    newPatient(patientData:PatientModel):PatientModel;
    getAll():IPatientInterface[];
}