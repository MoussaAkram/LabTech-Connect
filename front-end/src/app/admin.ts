import {AppCMS} from "./appCMS";

export interface Admin{
  _id?: number,
  name?: String,
  email?: String,
  password?: String,
  role?: String,
  containers ?: AppCMS[]
  token?:any
}
