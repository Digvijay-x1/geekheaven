import Category from "../models/category.model.js"
import Question from "../models/question.model.js";


export const getContent = async (req , res) => {
   const categories = await Category.find()
   .populate("questions");
   res.json(categories);
};


// Assuming Category has a "questions" field with ObjectId refs to Question
export const example = async (req , res) => {
const categories = await Category.find()
  .populate({
    path: "questions",
    match: { title: { $regex: "Count Good numbers", $options: "i" } }
  });

console.log(categories);
}