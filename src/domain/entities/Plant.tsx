


export interface IPlant {
    id: number;
    name: string;
    image: string;
    description: string;
    exposition: string;
    care: string;
    toxicity: string;
    frequency?: number;
    type: string;
}


export default class Plant {

    id: number;
    name: string;
    image: string;
    description: string;
    exposition: string;
    care: string;
    toxicity: string;
    frequency: number;
    type: string;

    constructor(id: number, name: string, image: string, description: string, exposition: string, care: string,  toxicity: string, frequency: number, type: string){
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.exposition = exposition;
        this.care = care;
        this.toxicity = toxicity;
        this.frequency = frequency;
        this.type = type;
    }
}

