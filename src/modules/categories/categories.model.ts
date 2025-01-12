import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './categories.interface';



const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
},
{
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
});

export const Category = model<ICategory,CategoryModel>('Category', CategorySchema);

