import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text")
  title!: string;

  @Column("text")
  content!: string;

  @Column("int")
  views!: number;

  @Column("datetime")
  create_date!: Date;

  @Column("datetime")
  update_date!: Date;

  @Column("boolean")
  is_deleted!: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[];
}
