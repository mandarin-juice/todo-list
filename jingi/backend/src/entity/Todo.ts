import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: true })
  text: string;

  @Column({ default: false })
  isDone: boolean;
}
