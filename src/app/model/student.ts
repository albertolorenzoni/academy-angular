export class Student {

    id?: number;

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: Date,
        public education: string
    ) { }
}