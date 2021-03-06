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

export interface UserType {
  id: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
}

export interface CommentType {
  id: number;
  content: string;
  create_date: Date;
  update_date: Date;
  user: User;
  article: Article;
}

export interface ArticleType {
  id: number;
  title: string;
  content: string;
  views: number;
  create_date: Date;
  update_date: Date;
  is_deleted: boolean;
  user: User;
  comments: CommentType[];
}

export interface HomePropsType {
  articles: ArticleType[];
}
