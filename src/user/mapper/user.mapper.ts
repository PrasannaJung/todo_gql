import { plainToInstance } from 'class-transformer';
import { UserDocument } from '../schema/user.schema';
import { UserEntity } from '../entity/user.entity';

export const toUserEntity = (data: UserDocument): UserEntity => {
  return plainToInstance(UserEntity, data, {
    excludeExtraneousValues: true,
  });
};

export const toUserEntityList = (data: UserDocument[]): UserEntity[] => {
  return data.map(toUserEntity);
};
