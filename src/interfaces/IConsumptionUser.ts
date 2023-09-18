import { StatusEnum } from "../enums/StatusEnum"
import { IService } from "./IService"
import { IUser } from "./IUser"

export interface IConsumption {
    id: number,
    period: string,
    status: StatusEnum,
    amount: number
    service: IService
}

export interface IUserConsumption extends IConsumption {
    client: IUser
}