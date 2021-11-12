import Plant from "./Plant";

export default class GardenerPlant implements IGardenerPlant {

    id: number;
    nickname: string;
    sunlight: string;
    size: string;
    season: string;
    topography: string;
    location: string;
    frequency: number;
    image: string;

    

    constructor(id: number, nickname: string, sunlight: string, size: string, season: string, topography: string,  location: string, frequency: number, image: string){
        this.id = id;
        this.nickname = nickname;
        this.sunlight = sunlight;
        this.size = size;
        this.season = season;
        this.topography = topography;
        this.location = location;
        this.frequency = frequency;
        this.image = image;
    }
}

export interface IGardenerPlant {
    id: number;
    nickname: string;
    sunlight: string;
    size: string;
    season: string;
    topography: string;
    location: string;
    frequency: number;
    image: string;
}

