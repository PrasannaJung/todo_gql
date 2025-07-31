import { FilterQuery, UpdateQuery } from 'mongoose';

export interface BaseRepository<T, DocumentType> {
  findById(id: string): Promise<DocumentType | null>;
  findOne(query: FilterQuery<T>): Promise<DocumentType | null>;
  findAll(): Promise<DocumentType[]>;
  create(data: Partial<T>): Promise<DocumentType>;
  update(id: string, data: UpdateQuery<T>): Promise<DocumentType | null>;
  deleteById(id: string): Promise<DocumentType | null>;
}
