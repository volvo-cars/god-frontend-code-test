export interface ICarInfo {
  id: string;
  label?: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export interface ILinkValue {
  text: string;
  id: string;
  label?: string;
}

export interface IFilterList {
  id?: string;
  itemList: ICarInfo[];
  setFilteredList: Function;
}
