import { IronSession } from "iron-session";

type SessionExtension = {
  smsCode: number;
};

export type ISession = IronSession & SessionExtension;

export interface SmsResult {
  statusCode: string;
  templateSMS?: {};
  statusMsg?: String;
}
