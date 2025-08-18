import Category from "../models/category.model.js"
import Question from "../models/question.model.js";


export const getContent = async (req , res) => {
   const categories = await Category.find()
   .populate("questions");
   res.json(categories);
};


export const SuperContentSearch = async (req , res) => {
   try {
        const { search, difficulty, page = 1, limit = 10 } = req.query;
        
        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search parameter is required"
            });
        }

        // Convert page and limit to numbers with defaults
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Build the query object
        let queryObject = {
            title: {
                $regex: search,
                $options: "i"
            }
        };

        // Add difficulty to query if provided
        if (difficulty && difficulty.trim()) {
            queryObject.difficulty = new RegExp(difficulty.trim(), "i");
        }

        // Execute the query with pagination
        const totalQuestions = await Question.countDocuments(queryObject);
        const questions = await Question.find(queryObject)
            .skip(skip)
            .limit(limitNum);

        return res.status(200).json({
            success: true,
            count: questions.length,
            totalQuestions,
            currentPage: pageNum,
            totalPages: Math.ceil(totalQuestions / limitNum),
            data: questions,
            pagination: {
                prev: pageNum > 1 ? pageNum - 1 : null,
                current: pageNum,
                next: pageNum * limitNum < totalQuestions ? pageNum + 1 : null
            }
        });

    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}