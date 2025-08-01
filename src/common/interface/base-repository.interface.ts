import { FilterQuery, UpdateQuery } from 'mongoose';
import { PaginationInputArgs } from '../dto/pagination-input';
import { PaginationResponseInterface } from './pagination-response.interface';

export interface BaseRepository<T, DocumentType> {
  findById(id: string): Promise<DocumentType | null>;
  findOne(query: FilterQuery<T>): Promise<DocumentType | null>;
  findAll(): Promise<DocumentType[]>;
  findPaginatedData(
    query: FilterQuery<T>,
    paginationArgs: PaginationInputArgs,
  ): Promise<PaginationResponseInterface<DocumentType>>;
  create(data: Partial<T>): Promise<DocumentType>;
  update(id: string, data: UpdateQuery<T>): Promise<DocumentType | null>;
  deleteById(id: string): Promise<DocumentType | null>;
}
