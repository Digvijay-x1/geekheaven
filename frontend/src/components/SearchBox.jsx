import { useState, useEffect } from "react";
import useCategoryStore from "../stores/useCatagoryStore";

const SearchBox = () => {
  const [input, setInput] = useState("");     // raw user input
  const [search, setSearch] = useState("");   // debounced value

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(input);
    }, 500); // wait 500ms

    return () => clearTimeout(handler); // cleanup on next keystroke
  }, [input]);

  const { query, IsQueryLoading } = useCategoryStore(search);

  return (
    <div className="p-4">
      <div className="mb-2 font-semibold">SearchBox</div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded w-full"
      />

      {IsQueryLoading && <p>Loading...</p>}

      {!IsQueryLoading && query && (
        <div className="mt-4">
          <h3 className="font-bold">Results:</h3>
          <pre>{JSON.stringify(query, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
