export class Challenge{
    constructor(
        public title:string,
        public description:string,
        public startDate?:Date,
        public endDate?:Date,
        public status?:'active'|'notActive',
        public id?:number,
    ){}
}