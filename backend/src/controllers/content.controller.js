import Category from "../models/category.model.js"
import Question from "../models/question.model.js";


export const getContent = async (req , res) => {
   try {
        const {
            search,
            difficulty,
            sort = "asc",
            page = 1,
            limit = 10
        } = req.query;

        const sortOrder = sort === "desc" ? -1 : 1;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build match conditions for questions
        const questionMatch = {};
        
        if (difficulty && difficulty.trim() !== '') {
            questionMatch.difficulty = { $regex: new RegExp(`^${difficulty}$`, 'i') };
        }
        
        if (search && search.trim() !== '') {
            questionMatch.title = { $regex: new RegExp(search, 'i') };
        }

        const pipeline = [
            // Lookup questions
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questions',
                    foreignField: '_id',
                    as: 'questions'
                }
            },
            // Unwind questions for filtering
            {
                $unwind: {
                    path: '$questions',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Match questions based on filters
            ...(Object.keys(questionMatch).length > 0 ? [
                {
                    $match: {
                        $or: [
                            { questions: { $exists: false } },
                            { questions: questionMatch }
                        ]
                    }
                }
            ] : []),
            // Group back by category
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    questions: {
                        $push: {
                            $cond: [
                                { $ifNull: ['$questions', false] },
                                '$questions',
                                '$$REMOVE'
                            ]
                        }
                    }
                }
            },
            // Sort questions within each category
            {
                $addFields: {
                    questions: {
                        $sortArray: {
                            input: '$questions',
                            sortBy: { title: sortOrder }
                        }
                    }
                }
            },
            // Add pagination fields
            {
                $addFields: {
                    totalQuestions: { $size: '$questions' },
                    totalPages: { 
                        $ceil: { 
                            $divide: [{ $size: '$questions' }, parseInt(limit)] 
                        } 
                    },
                    currentPage: parseInt(page),
                    questions: {
                        $slice: [
                            '$questions', 
                            skip, 
                            parseInt(limit)
                        ]
                    }
                }
            }
        ];

        const categories = await Category.aggregate(pipeline);

        res.json({
            success: true,
            data: categories,
            filters: {
                search: search || null,
                difficulty: difficulty || null,
                sort,
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });

    } catch (err) {
        console.error("Error fetching categories (optimized):", err);
        res.status(500).json({ 
            success: false,
            error: "Server error",
            message: err.message 
        });
    }
};