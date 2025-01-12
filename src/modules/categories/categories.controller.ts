import { Request, Response } from "express"
import catchAsync from "../../share/catchAsync"
import pick from "../../share/pick"
import { paginationFields } from "../../constants/pagination"
import sendResponse from "../../share/sendResponse"
import httpStatus from "http-status"
import { ICategory } from "./categories.interface"
import { productsFilterableFields } from "../products/products.constant"
import { CategoryService } from "./categories.service"

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, productsFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await CategoryService.getAllCategory(
      filters,
      paginationOptions,
    )
  
    sendResponse<ICategory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully!',
      meta: result.meta,
      data: result.data,
    })
})


const saveCategory = catchAsync(
    async (req: Request, res: Response) => {
    const { ...categoryData } = req.body
    const result =
    await CategoryService.saveCategory(categoryData)

    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
    })
},
)




export const CategoryController = {
    getAllCategory,
    saveCategory
}