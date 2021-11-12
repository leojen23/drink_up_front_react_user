import GardenerPlant from "./GardenerPlant";

export default class User {

    id: number;
    gender: string;
    firstname: string;
    surname: string;
    is_notified: boolean;
    gardenerPlants: GardenerPlant[];
    numberOfPlants: number;

    constructor(id: number, gender: string, firstname: string, surname: string, is_notified: boolean, gardenerPlants:GardenerPlant[], numberOfPlants: number){
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.surname = surname;
        this.is_notified = is_notified;
        this.gardenerPlants = gardenerPlants;
        this.numberOfPlants = numberOfPlants;
    }
}

