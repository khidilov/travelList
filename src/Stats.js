export const Stats = ({ items }) => {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Nothing on mind?</em>
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
