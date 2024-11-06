import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { University } from "./University";
import { Specialization } from "./Specialization";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    () => Specialization,
    (specialization) => specialization.department
  )
  specializations!: Specialization[];

  @ManyToOne(() => University, (university) => university.departments)
  university!: University | null; // Ensure this relationship is defined correctly
}
