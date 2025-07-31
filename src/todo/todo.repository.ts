import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { TodoRepositoryInterface } from './interface/todo-respository.interface';
import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoRepository implements TodoRepositoryInterface {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async findById(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findById(id).exec();
  }

  async findOne(query: FilterQuery<Todo>): Promise<TodoDocument | null> {
    return await this.todoModel.findOne(query).exec();
  }

  async findAll(): Promise<TodoDocument[]> {
    return await this.todoModel.find().exec();
  }

  async create(data: Partial<Todo>): Promise<TodoDocument> {
    const createdTodo = new this.todoModel(data);
    return await createdTodo.save();
  }

  async update(
    id: string,
    data: UpdateQuery<Todo>,
  ): Promise<TodoDocument | null> {
    return await this.todoModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }
}
