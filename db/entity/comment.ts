import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Article } from "./article";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text")
  content!: string;

  @Column("datetime")
  create_date!: Date;

  @Column("datetime")
  update_date!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" })
  article!: Article;
}
