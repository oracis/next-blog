import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity({ name: "user_auths" })
export class UserAuth {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text")
  identifier!: string;

  @Column("text")
  identify_type!: string;

  @Column("text")
  credential!: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
