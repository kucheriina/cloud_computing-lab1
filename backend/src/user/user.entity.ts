import { Base } from 'src/utils/base';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
