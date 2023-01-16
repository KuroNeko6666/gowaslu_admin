import { AccountModel } from "../models/account-model";
import { ActivityModel } from "../models/activity-model";
import { NewsModel } from "../models/news-model";
import { AccountInterfaces } from "./account-interfaces";
import { LoginResponseInterfaces } from "./login-response-interfaces";

export interface ResponseInterfaces {
  code: number,
  message: string,
  data: string | AccountModel | AccountModel[] | LoginResponseInterfaces | ActivityModel | ActivityModel[] | NewsModel | NewsModel[]
}
