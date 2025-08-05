import { FilterQuery, UpdateQuery, QueryWithHelpers } from 'mongoose';
import { PaginationInputArgs } from '../dto/pagination-input';
import { PaginationResponseInterface } from './pagination-response.interface';

export interface BaseRepository<T, DocumentType> {
  findById(id: string): Promise<DocumentType | null>;
  findOne(query: FilterQuery<T>): Promise<DocumentType | null>;
  findAll(): Promise<DocumentType[]>;
  findPaginatedData<K extends keyof T>(
    query: FilterQuery<T>,
    paginationArgs: PaginationInputArgs,
    // sort: Record<K, 1 | -1>,
  ): Promise<PaginationResponseInterface<DocumentType>>;
  create(data: Partial<T>): Promise<DocumentType>;
  update(id: string, data: UpdateQuery<T>): Promise<DocumentType | null>;
  deleteById(id: string): Promise<DocumentType | null>;
}
