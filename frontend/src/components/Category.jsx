import { useState } from "react";
import { ChevronRight, ChevronDown, Play, Star, Plus } from "lucide-react";
import useCategoryStore from "../stores/useCatagoryStore";
import useBookmarks from "../stores/useBookmarks";
import useAuthStore from "../stores/useAuthStore";
import useProgress from "../stores/useProgress";
import { getDifficultyColor } from "../lib/difficultycolor";

const Category = () => {
  const { bookmarkMutate } = useBookmarks();

  const { progressMutate } = useProgress();

  const { authUser } = useAuthStore();

  const { categories = [] } = useCategoryStore();
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Early return if no categories
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-base-100 text-base-content min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-base-content/60 mb-2">
            No categories available
          </h2>
          <p className="text-base-content/40">
            Please check your store configuration
          </p>
        </div>
      </div>
    );
  }

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {categories?.map((category) => {
          const isExpanded = expandedCategories.has(category._id);
          const completedQuestions =
            category.questions?.filter((question) =>
              authUser?.progress?.includes(question._id)
            ).length || 0;
          const totalQuestions = category.questions?.length || 0;
          const progressPercentage =
            totalQuestions > 0
              ? (completedQuestions / totalQuestions) * 100
              : 0;

          return (
            <div key={category._id} className="mb-4">
              {/* Category Header */}
              <div
                className="flex items-center justify-between p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
                onClick={() => toggleCategory(category._id)}
              >
                <div className="flex items-center space-x-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-base-content/60" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-base-content/60" />
                  )}
                  <h2 className="text-lg font-medium text-base-content">
                    {category.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-base-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-base-content/60 min-w-12">
                      {completedQuestions} / {totalQuestions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              {isExpanded && (
                <div className="mt-2 bg-base-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-base-300 border-b border-base-content/20 text-sm font-medium text-base-content/80">
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-3">Problem</div>
                    <div className="col-span-1 text-center">
                      Resource (Free)
                    </div>
                    <div className="col-span-1 text-center">
                      Practice (Free)
                    </div>
                    <div className="col-span-1 text-center">
                      Practice (Plus)
                    </div>
                    <div className="col-span-1 text-center">Note</div>
                    <div className="col-span-1 text-center">Revision</div>
                    <div className="col-span-2 text-center">Difficulty</div>
                  </div>

                  {/* Questions */}
                  {category.questions?.map((question, questionIndex) => (
                    <div
                      key={
                        question._id ||
                        question.id ||
                        `question-${questionIndex}`
                      }
                      className="grid grid-cols-12 gap-4 p-4 border-b border-base-content/20 hover:bg-base-300 transition-colors"
                    >
                      {/* Status Checkbox */}
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={authUser?.progress?.includes(question._id)}
                          onChange={() => progressMutate(question._id)}
                          className={`w-4 h-4 rounded border-base-content/40 transition-all duration-300 
                        ${
                          authUser?.progress?.includes(question._id)
                            ? "bg-green-500 border-green-500"
                            : "bg-base-300 hover:border-green-500"
                        }`}
                        />
                      </div>

                      {/* Problem Title */}
                      <div className="col-span-3">
                        <span className="text-base-content hover:text-orange-500 cursor-pointer">
                          {question.title}
                        </span>
                        {question.tags && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.isArray(question.tags)
                              ? question.tags.map((tag, index) => (
                                  <span
                                    key={`${
                                      question._id || question.id || "q"
                                    }-tag-${index}`}
                                    className="px-2 py-0.5 bg-base-300 text-xs rounded text-base-content/80"
                                  >
                                    {tag}
                                  </span>
                                ))
                              : typeof question.tags === "string" &&
                                question.tags.split(",").map((tag, index) => (
                                  <span
                                    key={`${
                                      question._id || question.id || "q"
                                    }-tag-${index}`}
                                    className="px-2 py-0.5 bg-base-300 text-xs rounded text-base-content/80"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                          </div>
                        )}
                      </div>

                      {/*  YouTube Link */}
                      <div className="col-span-1 flex justify-center items-center">
                        {question.yt_link ? (
                          <a
                            href={question.yt_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-orange-400"
                          >
                            <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                              <Play className="w-2 h-2 text-white" />
                            </div>
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>

                      {/* Practice */}
                      <div className="col-span-1 flex justify-center items-center">
                        {question.p1_link ? (
                          <div className="flex space-x-1">
                            <a
                              href={question.p1_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:text-orange-400"
                            >
                              Solve
                            </a>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>

                      {/* Practice */}
                      <div className="col-span-1 flex justify-center items-center">
                        {question.p2_link ? (
                          <div className="flex space-x-1">
                            <a
                              href={question.p2_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:text-orange-400"
                            >
                              Solve
                            </a>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>

                      {/* Note */}
                      <div className="col-span-1 flex justify-center">
                        <button className="text-base-content/60 hover:text-base-content">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Revision */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => bookmarkMutate(question._id)}
                          className={`transition-all duration-300 ${
                            authUser?.bookmarks?.includes(question._id)
                              ? "text-yellow-500 hover:text-yellow-400 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]"
                              : "text-gray-400 hover:text-yellow-500"
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              authUser?.bookmarks?.includes(question._id)
                                ? "fill-yellow-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Difficulty */}
                      <div className="col-span-2 flex justify-center items-center">
                        <span
                          className={`px-3 py-1  text-sm font-medium  ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
