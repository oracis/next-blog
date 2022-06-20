import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text")
  nickname!: string;

  @Column("text")
  avatar!: string;

  @Column("text")
  job!: string;

  @Column("text")
  introduce!: string;
}
