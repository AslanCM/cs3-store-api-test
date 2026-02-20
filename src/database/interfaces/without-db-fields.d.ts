export type TWithoutDbFields<T> = Omit<
  T,
  '_collection' | '_id' | 'createdAt' | 'updatedAt'
>;
