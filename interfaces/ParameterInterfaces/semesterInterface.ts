export interface Semester extends CreateSemester{
    id:number;
}

export interface CreateSemester{
    name:string;
    level:number;
    required_hours:number;
    structural_core:string;
}