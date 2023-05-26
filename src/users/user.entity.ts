import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
