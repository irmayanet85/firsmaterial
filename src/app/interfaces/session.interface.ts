import { Usuario } from "../models/user.models";

export interface ISession {
    dataUser:Usuario,
    status: boolean,

}