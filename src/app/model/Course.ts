export class Course {
    id?: number;

    constructor(
        public name: string,
        public capacity: number,
        public prefClassroomName: string,
        public totalHours: number
    ) { }
}