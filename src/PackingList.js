import { useState } from "react";
import { Item } from "./Item";

export const PackingList = ({
  items,
  onDeleteItem,
  onCompleteItem,
  onClear,
}) => {
  const [sortBy, setSortBy] = useState("input");
  const sortingFunctions = {
    input: (a, b) => a.id - b.id,
    alphabet: (a, b) =>
      a.description.localeCompare(b.description) || a.id - b.id,
    done: (a, b) => Number(a.packed) - Number(b.packed),
  };
  let sortedItems = [...items].sort(sortingFunctions[sortBy]);
  const clearUI = () => {
    onClear([]);
  };
  console.log(items);
  // let sortedItems;
  // if (sortBy === "input") sortedItems = items;
  // if (sortBy === "alphabet")
  //   sortedItems = items.toSorted((a, b) =>
  //     a.description.localeCompare(b.description)
  //   );
  // if (sortBy === "done")
  //   sortedItems = items.toSorted((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((i) => (
          <Item
            item={i}
            key={i.id}
            onDeleteItem={onDeleteItem}
            onCompleteItem={onCompleteItem}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="alphabet">Sort by alphabet</option>
          <option value="done">Sort by completion</option>
        </select>
        <button
          onClick={() =>
            window.confirm("Are you sure you want to clear items") && clearUI()
          }
        >
          Clear
        </button>
      </div>
    </div>
  );
};
