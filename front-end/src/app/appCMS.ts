import {Vision} from "./vision";

export interface AppCMS {
  _id?: number ,
  email?: String,
  name?: String,
  speciality?: String,
  contenants ?: String,
  date ?: String,
  image?: any,
  visions ?: Vision[]
}
