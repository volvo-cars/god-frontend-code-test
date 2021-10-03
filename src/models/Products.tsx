export enum BodyType {
	Suv = "suv",
	Sedan = "sedan",
	Estate = "estate"
}

export enum ModelType {
	PlugInHybrid = "plug-in hybrid",
	PureElectric = "pure electric"
}

export interface ProductInterface {
	id: string
	modelName: string
	bodyType: string 
	modelType: string
	imageUrl: string
}
