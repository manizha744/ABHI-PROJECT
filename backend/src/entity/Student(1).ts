import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Specialization } from "./Specialization";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;

  @ManyToOne(() => Specialization, (specialization) => specialization.students)
  specialization!: Specialization | null;
}
