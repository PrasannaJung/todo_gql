// import { DataStore } from 'src/common/data-store.type';
// import { TodoEntity, TodoStatus } from '../entity/todo.entity';
// import { users } from 'src/user/store/user.store';

// export type TodoDataStore = DataStore<
//   Omit<TodoEntity, 'assignee' | 'assignedTo'>
// > & {
//   assigneeId: number;
//   assignedToId: number;
// };

// export const todos: Array<TodoDataStore> = [
//   {
//     id: 1,
//     title: 'Start learning GraphQL',
//     status: TodoStatus.ACTIVE,
//     assigneeId: users[0].id,
//     assignedToId: users[1].id,
//   },
//   {
//     id: 2,
//     title: 'Implement GraphQL in NestJs',
//     status: TodoStatus.COMPLETED,
//     assigneeId: users[0].id,
//     assignedToId: users[1].id,
//   },
// ];
