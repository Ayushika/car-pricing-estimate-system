import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('new user inserted ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with ${this.id} id got updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user');
  }
}
