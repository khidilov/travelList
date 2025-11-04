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

const PackingList = ({ items, onDeleteItem, onCompleteItem }) => {
  const [sortBy, setSortBy] = useState("input");
  const sortingFunctions = {
    input: (a, b) => a.id - b.id,
    alphabet: (a, b) =>
      a.description.localeCompare(b.description) || a.id - b.id,
    done: (a, b) => Number(a.packed) - Number(b.packed),
  };
  const sortedItems = [...items].sort(sortingFunctions[sortBy]);
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
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input</option>
        <option value="alphabet">Sort by alphabet</option>
        <option value="done">Sort by completion</option>
      </select>
    </div>
  );
};

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

const Stats = ({ items }) => {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Nothing in mind?</em>
      </footer>
    );

  const total = items.length;
  const completed = items.filter((i) => i.packed).length;
  const percentage = Math.round((completed * 100) / total);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Ready to go"
          : `🧳 You have ${total} items on your list, and you already packed
        ${completed} (${percentage}%)`}
      </em>
    </footer>
  );
};
