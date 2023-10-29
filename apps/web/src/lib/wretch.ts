import wretch from "wretch";

export const api = <T>() =>
  wretch()
    .url("http://localhost:3333/api")
    .errorType("json")
    .resolve((res) => res.json<T>());
