export default function Button({ onClick, idToAdd, children }) {
  return (
    <button className="button"  id={idToAdd} onClick={onClick} >
      {children}
    </button>
  );
}
