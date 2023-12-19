export interface CursorPagination {
  cursor?: {
    id: string;
  };
  take?: number;
  skip?: number;
}

export interface OrderBy {
  [key: string]: 'asc' | 'desc';
}
