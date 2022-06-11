import { VehicleInformation } from "@Models/vehicleInformation";
import { Apis } from "@Constants/apis";
import { axiosGet } from "@Utils/networkRequest";

export async function getAllVehicles(): Promise<Array<VehicleInformation>> {
  try {
    return await axiosGet<Array<VehicleInformation>>(Apis.getAllVehicles);
  } catch (err) {
    // TODO: handle & report server side error
    return [];
  }
}

export async function getVehicleById(
  id: string
): Promise<VehicleInformation | undefined> {
  try {
    const vehicles = await axiosGet<Array<VehicleInformation>>(
      Apis.getAllVehicles
    );

    return vehicles.find((vehicle) => vehicle.id === id);
  } catch (err) {
    // TODO: handle & report server side error
    return undefined;
  }
}
