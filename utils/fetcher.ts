import { server } from "../config";

export const fetcher = (url: string) =>
  fetch(`${server}${url}`).then((res) => res.json());
