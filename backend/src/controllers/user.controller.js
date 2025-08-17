import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Question  from "../models/question.model.js";

export const toggleBookMarks = async (req,res) => {
    try {
        const questionId = req.params.id;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // find if the question exists 
        const questionExists = await Question.findById(questionId);
        if (!questionExists) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Toggle bookmark
        

        const isBookmarked = user.bookmarks.includes(questionId);
        if (isBookmarked) {
            user.bookmarks.pull(questionId);
        } else {
            user.bookmarks.push(questionId);
        }

        await user.save();
        res.status(200).json({ message: "Bookmarks updated", isBookmarked: !isBookmarked });
    } catch (error) {
        console.error("error toggling bookmarks" , error); 
        return res.status(500).json({
            message: "internal server error" 
        })
    }
}

export const getBookMarks = async (req,res) => {
    try {
        const userId = req.user._id;
        const bookmarks = await User.findById(userId).populate('bookmarks').lean();

        if (!bookmarks) {
            return res.status(404).json({ message: "No bookmarks found" });
        }

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks in user controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const Progress = async (req ,res) => {
    res.send("this is the progress");
}