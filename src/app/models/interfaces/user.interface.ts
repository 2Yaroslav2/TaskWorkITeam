import {IHobby} from "./hobby.interface";

export interface IUser {
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  framework: string,
  frameworkVersion: string,
  email: string,
  hobby: IHobby[]
}
