import { SortOrder } from "mongoose"
import { paginationHelpers } from "../../helpers/paginationHeloper"
import { IGenericResponse } from "../../interface/common"
import { IPaginationOptions } from "../../interface/pagination"
import { IProducts, IProductsFilters } from "./products.interface"
import { productsSearchableFields } from "./products.constant"
import { Products } from "./products.model"
import { generateProductCode } from "./products.utils"
import { Category } from "../categories/categories.model"

const getAllProducts = async (
    filters: IProductsFilters,
    paginationOptions: IPaginationOptions,
  ): Promise<IGenericResponse<IProducts[]>> => {
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
  
    const result = await Products.find(whereConditions)
      .populate('categoryId')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)
  
    const total = await Products.countDocuments()
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  }


  const saveProducts = async (
    payload: IProducts,
  ): Promise<IProducts> => {

    let pcode=await generateProductCode(payload.name)

    const existingProduct = await Products.findOne({ 
      pcode:await pcode 
    });
  
    if (existingProduct) {
      pcode=await generateProductCode(payload.name)
    }

    const categoryExists = await Category.findById(payload.categoryId);
    if (!categoryExists) {
      throw new Error('Invalid category ID');
    }

    const result = await Products.create({ ...payload, pcode })
    return result
  }


  const updateProduct = async (
    id: string,
    payload: Partial<IProducts>,
  ): Promise<IProducts | null> => {
    const result = await Products.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true },
    )
    return result
  }

  export const ProductsService = {
    getAllProducts,
    saveProducts,
    updateProduct
  }