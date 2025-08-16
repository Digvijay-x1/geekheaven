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

    
    let categories = await Category.find()
      .populate("questions")
      .lean();

    // for each category
    categories = categories.map(cat => {
      let filteredQuestions = cat.questions;

      // Difficulty filter
      if (difficulty) {
        filteredQuestions = filteredQuestions.filter(
          q => q.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }

      // Search filter
      if (search) {
        filteredQuestions = filteredQuestions.filter(q =>
          q.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sort
      filteredQuestions.sort(
        (a, b) => a.title.localeCompare(b.title) * sortOrder
      );

      // Pagination calculations
      const totalQuestions = filteredQuestions.length;
      const totalPages = Math.ceil(totalQuestions / parseInt(limit));
      const currentPage = parseInt(page);

      // Slice for pagination
      const start = (currentPage - 1) * parseInt(limit);
      const paginatedQuestions = filteredQuestions.slice(
        start,
        start + parseInt(limit)
      );

      return {
        title: cat.title,
        totalQuestions,
        totalPages,
        currentPage,
        questions: paginatedQuestions
      };
    });

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories", err);
    res.status(500).json({ error: "Server error" });
  }
};