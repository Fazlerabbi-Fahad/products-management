import { SortOrder } from "mongoose"
import { paginationHelpers } from "../../helpers/paginationHeloper"
import { IGenericResponse } from "../../interface/common"
import { IPaginationOptions } from "../../interface/pagination"
import { Category } from "../categories/categories.model"
import { ICategory, ICategoryFilters } from "./categories.interface"
import { productsSearchableFields } from "../products/products.constant"

const getAllCategory = async (
    filters: ICategoryFilters,
    paginationOptions: IPaginationOptions,
  ): Promise<IGenericResponse<ICategory[]>> => {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)
  
    const { searchTerm, ...filtersData } = filters
  
    const andConditions = []
  
    if (searchTerm) {
      andConditions.push({
        $or: productsSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }
  
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }
    const sortConditions: { [key: string]: SortOrder } = {}
  
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }
  
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {}
  
    const result = await Category.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)
  
    const total = await Category.countDocuments()
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  }


  const saveCategory = async (
    payload: ICategory,
  ): Promise<ICategory> => {
    const result = await Category.create({ ...payload })
    return result
  }


  export const CategoryService = {
    getAllCategory,
    saveCategory
  }