import { AccountModel } from "../models/account-model";
import { AccountInterfaces } from "./account-interfaces";
import { LoginResponseInterfaces } from "./login-response-interfaces";

export interface ResponseInterfaces {
  code: number,
  message: string,
  data: string | AccountModel | AccountModel[] | LoginResponseInterfaces
}
