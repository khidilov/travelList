import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function togglePacked(id) {
    setItems(
      items.map((item) =>
        id === item.id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCompleteItem={togglePacked}
      />
      <Stats items={items} />
    </div>
  );
}

const Logo = () => <h1>🏝️ Far away 🧳</h1>;

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items, onDeleteItem, onCompleteItem }) => (
  <div className="list">
    <ul>
      {items.map((i) => (
        <Item
          item={i}
          key={i.id}
          onDeleteItem={onDeleteItem}
          onCompleteItem={onCompleteItem}
        />
      ))}
    </ul>
  </div>
);

const Item = ({ item, onDeleteItem, onCompleteItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onCompleteItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => (
  <footer className="stats">
    <em>
      🧳 You have {items.length} items on your list, and you already packed{" "}
      {((items.filter((i) => i.packed).length * 100) / items.length).toFixed(2)}
      %
    </em>
  </footer>
);
