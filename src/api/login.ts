import instance from "../uilts/request.ts";

export function register(data: any) {
  return instance.post("/user", data);
}

export function login(data: any) {
  return instance.post("/login", data);
}
