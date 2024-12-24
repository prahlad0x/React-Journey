import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onChangePackingStatus,
  onItemRemoval,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = items;

  if (sortBy === "input") sortedItems = items.sort((a, b) => a.id - b.id);
  if (sortBy === "packed")
    sortedItems = items.sort((a, b) => a.packed - b.packed);
  if (sortBy === "description")
    sortedItems = items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

  return (
    <div className="list">
      <ul>
        {sortedItems.length > 0 &&
          sortedItems.map((item, i) => (
            <Item
              item={item}
              onChangeStatus={onChangePackingStatus}
              onRemoveItem={onItemRemoval}
              key={i}
            />
          ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
