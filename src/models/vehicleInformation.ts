export interface VehicleInformation {
  id: string;
  modelName: string;
  bodyType: VehicleBodyType;
  modelType: string;
  imageUrl: string;
}

export enum VehicleBodyType {
  suv = "suv",
  estate = "estate",
  sedan = "sedan",
}
