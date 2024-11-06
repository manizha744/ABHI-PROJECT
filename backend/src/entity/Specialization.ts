import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Department } from "./Department";
import { Student } from "./Student";

@Entity()
export class Specialization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Department, (department) => department.specializations)
  department!: Department | null;

  @OneToMany(() => Student, (student) => student.specialization)
  students!: Student[];
}
