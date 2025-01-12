import { Model, Types } from "mongoose"

export type Status = 'Stock Out' | 'Stock In'

export type IProducts = {
  name: string
  description: string
  price: number
  discount: number
  image: string
  status:Status
  pcode:string
  categoryId: Types.ObjectId;
}

export type ProductsModel = Model<
  IProducts,
  Record<string, unknown>
>

export type IProductsFilters = {
  searchTerm?: string,
  // category?:string
}