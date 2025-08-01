import { BaseRepository } from 'src/common/interface/base-repository.interface';
import { Todo, TodoDocument } from '../schema/todo.schema';

export interface TodoRepositoryInterface
  extends BaseRepository<Todo, TodoDocument> {
  deleteByUserId(userId: string): Promise<void>;
}
