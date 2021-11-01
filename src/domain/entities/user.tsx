
export default class User {

    id: number;
    gender: string;
    firstname: string;
    surname: string;
    is_notified: boolean;

    constructor(id: number, gender: string, firstname: string, surname: string, is_notified: boolean){
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.surname = surname;
        this.is_notified = is_notified;
    }
}

