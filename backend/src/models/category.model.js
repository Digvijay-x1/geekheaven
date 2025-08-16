
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
