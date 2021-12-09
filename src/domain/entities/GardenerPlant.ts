

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
    cataloguePlantId: number;
    cataloguePlantName: string;
    nextWateringDate: string;
    lastWateringDate: string;
    wateringStatus: number;
    wateringFrequency: number;
    numberOfLateDays: number;

    constructor(id: number, nickname: string, sunlight: string, size: string, season: string, topography: string,  location: string, frequency: number, image: string, cataloguePlantId: number,  cataloguePlantName: string, nextWateringDate: string,  lastWateringDate: string, wateringStatus: number,  wateringFrequency: number, numberOfLateDays: number){
        this.id = id;
        this.nickname = nickname;
        this.sunlight = sunlight;
        this.size = size;
        this.season = season;
        this.topography = topography;
        this.location = location;
        this.frequency = frequency;
        this.image = image;
        this.cataloguePlantId = cataloguePlantId;
        this.cataloguePlantName = cataloguePlantName;
        this.nextWateringDate = nextWateringDate
        this.lastWateringDate = lastWateringDate
        this.wateringStatus = wateringStatus
        this.wateringFrequency = wateringFrequency
        this.numberOfLateDays = numberOfLateDays
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
    cataloguePlantId: number;
    cataloguePlantName: string;
    nextWateringDate: string;
    lastWateringDate: string;
    wateringStatus: number;
    wateringFrequency: number;
    numberOfLateDays: number;
}

