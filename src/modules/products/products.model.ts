
import { IProducts, ProductsModel } from "./products.interface";
import { prodcutsAvailability } from "./products.constant";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { model, Schema } from "mongoose";

const productsSchema = new Schema<
  IProducts,
  ProductsModel
>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true,enum:prodcutsAvailability},
    pcode: { type: String, required: false},
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, 
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
) 

productsSchema.pre('save', async function (next) {
    const isExist = await Products.findOne({
        pcode: this.pcode,
    })
    if (isExist) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Academic semester is already exist',
      )
    }
    next()
  })
  
  export const Products = model<IProducts, ProductsModel>(
    'Products',
    productsSchema,
  )