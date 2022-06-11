import Axios, { AxiosResponse } from "axios";
import { Apis } from "@Constants/apis";

export const axios = Axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 10 * 1000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function axiosGet<T>(endpoint: Apis): Promise<T> {
  try {
    const res: AxiosResponse<T> = await axios.get<T>(encodeURI(endpoint));

    return res.data;
  } catch (error) {
    // TODO: Reporting Error
    console.error(error);

    if (error.response) {
      throw error.response.data;
    }

    throw error;
  }
}
