import { AxiosResponse } from "axios";
import { IronSession } from "iron-session";

type SessionExtension = {
  smsCode: number;
  userId: number;
  nickname: string;
  avatar: string;
};

export type ISession = IronSession & SessionExtension;

export interface SmsResult {
  statusCode: string;
  templateSMS?: {};
  statusMsg?: String;
}
