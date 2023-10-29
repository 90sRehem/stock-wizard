import axios from "redaxios";
// use as you would normally

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});
