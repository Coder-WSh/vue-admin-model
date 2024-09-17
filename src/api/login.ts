import instance from "../uilts/request.ts";

export function register(data: any) {
  return instance.post("/user/register", data);
}

export function login(data: any) {
  return instance.post("/user/login", data);
}