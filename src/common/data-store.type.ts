export type DataStore<T> = {
  [K in keyof T]: T[K];
};
