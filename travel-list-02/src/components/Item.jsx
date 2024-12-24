function Item({ item, onChangeStatus, onRemoveItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={(e) => {
          onChangeStatus(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} &nbsp; {item.description}
      </span>
      <button
        onClick={() => {
          onRemoveItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

export default Item;
