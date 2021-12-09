import GardenerPlant from "./GardenerPlant";






export interface IUser {
    id: number;
    gender: string;
    firstname: string;
    surname: string;
    isNotified: boolean;
    gardenerPlants: GardenerPlant[];
    numberOfPlants: number;
    numberOfOnDayWaterings: number;
    numberOfLateWaterings: number;
    numberOfUpToDateWaterings: number;
}
export default class User {

    id: number;
    gender: string;
    firstname: string;
    surname: string;
    isNotified: boolean;
    gardenerPlants: GardenerPlant[];
    numberOfPlants: number;
    numberOfOnDayWaterings: number;
    numberOfLateWaterings: number;
    numberOfUpToDateWaterings: number;

    constructor(id: number, gender: string, firstname: string, surname: string, isNotified: boolean, gardenerPlants:GardenerPlant[], numberOfPlants: number, numberOfOnDayWaterings: number, numberOfLateWaterings: number, numberOfUpToDateWaterings: number){
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.surname = surname;
        this.isNotified = isNotified;
        this.gardenerPlants = gardenerPlants;
        this.numberOfPlants = numberOfPlants;
        this.numberOfOnDayWaterings = numberOfOnDayWaterings;
        this.numberOfLateWaterings = numberOfLateWaterings;
        this.numberOfUpToDateWaterings = numberOfUpToDateWaterings;
    }
}

