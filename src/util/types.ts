export interface CarInfo {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export interface LinkValue {
  text: string;
  id: string;
}

export interface SearchList {
  itemList: CarInfo[];
  setFilteredList: Function;
}
