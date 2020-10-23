export class PaparaPaging<T> {
  items: T[];
  page: number;
  pageItemCount: number;
  totalItemCount: number;
  totalPageCount: number;
  pageSkip: number;
}
