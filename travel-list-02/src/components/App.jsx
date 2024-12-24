import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [initialItems, setItems] = useState([]);

  function handleItemAddition(data) {
    setItems((items) => [...items, data]);
  }

  function handleItemPackingStatus(itemId) {
    if (!itemId) return;
    setItems((el) =>
      el.map((item) => {
        if (itemId === item.id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function handleItemRemoval(itemId) {
    if (!itemId) return;
    setItems((el) => el.filter((item) => item.id !== itemId));
  }

  function handleClearList() {
    let isClear = window.confirm("Are you sure you want to clear the list");

    if (!isClear) return;
    setItems((data) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form items={initialItems} onAddItem={handleItemAddition} />

      <PackingList
        items={initialItems}
        onChangePackingStatus={handleItemPackingStatus}
        onItemRemoval={handleItemRemoval}
        onClearList={handleClearList}
      />

      <Stats items={initialItems} />
    </div>
  );
}

export default App;
