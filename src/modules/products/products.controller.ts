import { Request, Response } from "express"
import catchAsync from "../../share/catchAsync"
import pick from "../../share/pick"
import { productsFilterableFields } from "./products.constant"
import { paginationFields } from "../../constants/pagination"
import sendResponse from "../../share/sendResponse"
import httpStatus from "http-status"
import { IProducts } from "./products.interface"
import { ProductsService } from "./products.service"

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, productsFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await ProductsService.getAllProducts(
      filters,
      paginationOptions,
    )
  
    sendResponse<IProducts[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products fetched successfully!',
      meta: result.meta,
      data: result.data,
    })
})


const saveProducts = catchAsync(
    async (req: Request, res: Response) => {
    const { ...productsData } = req.body
    const result =
    await ProductsService.saveProducts(productsData)

    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products created successfully',
    data: result,
    })
},
)


const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await ProductsService.updateProduct(id, updatedData)

  sendResponse<IProducts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully!',
    data: result,
  })
})


export const ProductsController = {
    getAllProducts,
    saveProducts,
    updateProduct
}