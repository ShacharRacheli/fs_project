export class UserLogin {
    constructor(
        public email: string,
        public password: string,
    ) { }
}
export class Users{
    constructor(
        public email: string,
        public fullName: string,
        public joiningDate: Date,
        public id: number,
        public isDeleted?: boolean,
        // public password: string,
    ) { }
}