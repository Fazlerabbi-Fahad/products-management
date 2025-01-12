import { Status } from "./products.interface";

export const prodcutsAvailability: Status[] = ['Stock Out','Stock In']

export const productsSearchableFields = ['name', 'price','categoryId.name']
export const productsFilterableFields = [
    'searchTerm',
    'name',
    'price',
    'code',
  ]