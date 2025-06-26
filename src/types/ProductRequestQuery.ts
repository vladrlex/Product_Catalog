import { Category } from "./Category";
import { Sorting } from "./Sorting";

export interface ProductRequestQuery {
  page: number,
  limit: number,
  category: Category,
  sortBy: Sorting,
  color?: string;
  capacity?: string;
  ram?: string;
}