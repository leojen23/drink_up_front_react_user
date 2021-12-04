import GardenerPlant from "./GardenerPlant";






export interface IUser {
    id: number;
    gender: string;
    firstname: string;
    surname: string;
    isNotified: boolean;
    gardenerPlants: GardenerPlant[];
    numberOfPlants: number;
}
export default class User {

    id: number;
    gender: string;
    firstname: string;
    surname: string;
    isNotified: boolean;
    gardenerPlants: GardenerPlant[];
    numberOfPlants: number;

    constructor(id: number, gender: string, firstname: string, surname: string, isNotified: boolean, gardenerPlants:GardenerPlant[], numberOfPlants: number){
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.surname = surname;
        this.isNotified = isNotified;
        this.gardenerPlants = gardenerPlants;
        this.numberOfPlants = numberOfPlants;
    }
}

