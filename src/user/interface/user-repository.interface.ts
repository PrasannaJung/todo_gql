import { BaseRepository } from 'src/common/interface/base-repository.interface';
import { User, UserDocument } from '../schema/user.schema';

export interface UserRepositoryInterface
  extends BaseRepository<User, UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
}
