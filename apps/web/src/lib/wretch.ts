import wretch from "wretch";

export const api = wretch().url("http://localhost:3333/api").errorType("json");
