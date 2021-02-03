import { Enrollment } from "./Enrollment";

export class Student {

    id?: number;
    enrollments: Enrollment[];

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: Date,
        public education: string
    ) { }
}