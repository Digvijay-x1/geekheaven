import { useState, useEffect } from "react";
import useCategoryStore from "../stores/useCatagoryStore";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getDifficultyColor } from "../lib/difficultycolor";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("search") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || ""
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // debounce  for search 500 ms 
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(input);
      if (input) {
        setSearchParams({
          search: input,
          ...(difficulty && { difficulty }),
          page: 1,
        });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [input, difficulty, setSearchParams]);

  // url update in every query 
  useEffect(() => {
    if (search) {
      setSearchParams({
        search,
        ...(difficulty && { difficulty }),
        page: 1, 
      });
    }
  }, [difficulty, search, setSearchParams]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (query?.totalPages || 1)) {
      setPage(newPage);
      setSearchParams({
        search,
        ...(difficulty && { difficulty }),
        page: newPage,
      });
    }
  };

  const { query, IsQueryLoading } = useCategoryStore({
    search,
    difficulty,
    page,
  });

  const difficultyOptions = ["Easy", "Medium", "Hard"];

  return (
    <div className="p-4 bg-base-100 text-base-content">
      <div className="mb-4">
        <div className="mb-2 font-semibold">Search Questions</div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search by title..."
              className="w-full border p-2 pr-8 rounded bg-base-200 border-base-300 text-base-content"
            />
            {input && (
              <button
                onClick={() => {
                  setInput("");
                  setPage(1);
                  setSearch("");
                  setSearchParams({});
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 rounded bg-base-200 border-base-300 text-base-content"
          >
            <option value="">All Difficulties</option>
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {IsQueryLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-content"></div>
        </div>
      )}

      {!IsQueryLoading && query && (
        <div className="mt-4 space-y-6">
          <div className="flex justify-between text-sm text-base-content/60">
            <span>Found {query.totalQuestions} results</span>
            <span>
              Page {query.currentPage} of {query.totalPages}
            </span>
          </div>

          <div className="space-y-4">
            {query.data?.map((question) => (
              <div
                key={question._id}
                className="p-5 bg-base-200 rounded-lg hover:bg-base-300 transition-colors border border-base-300"
              >
                {/* Title and Difficulty */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-base-content leading-tight flex-1 mr-4">
                    {question.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded flex-shrink-0 ${getDifficultyColor(
                            question.difficulty
                          )}`}
                  >
                    {question.difficulty}
                  </span>
                </div>

                {/* Links Section */}
                <div className="flex items-center gap-6 mb-4 flex-wrap">
                  {/* YouTube Link */}
                  <div className="flex items-center gap-2">
                    <span className="text-base-content/60 text-sm font-medium">Tutorial:</span>
                    {question.yt_link ? (
                      <a
                        href={question.yt_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">Watch</span>
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">Not Available</span>
                    )}
                  </div>

                  {/* Practice Links */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base-content/60 text-sm font-medium">Practice Free:</span>
                      {question.p1_link ? (
                        <a
                          href={question.p1_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors "
                        >
                          Solve
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">Not Available</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-base-content/60 text-sm font-medium">Practice Plus:</span>
                      {question.p2_link ? (
                        <a
                          href={question.p2_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-orange-300 text-sm font-medium  transition-colors"
                        >
                          Solve
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">Not Available</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                {question.tags && question.tags.length > 0 && (
                  <div className="border-t border-base-300 pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base-content/60 text-sm font-medium">Tags:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {question.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-base-300 text-sm rounded-full text-base-content/80 border border-base-content/20 hover:bg-base-content/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`p-3 rounded-lg transition-colors ${
                page === 1
                  ? "bg-base-200 text-base-content/40 cursor-not-allowed"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-base-content/80 font-medium px-4">
              Page {query.currentPage} of {query.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === query.totalPages}
              className={`p-3 rounded-lg transition-colors ${
                page === query.totalPages
                  ? "bg-base-200 text-base-content/40 cursor-not-allowed"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;