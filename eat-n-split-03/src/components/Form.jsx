import { useState } from "react";
import Button from "./Button";

function AddFriendForm({ isOpen, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  if (!isOpen) return <div></div>;

  const dummyUrl = `https://i.pravatar.cc/48`;
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    onAddFriend(name, image || dummyUrl);
    setImage("");
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🦹‍♂️ Name</label>
      <input
        type="text"
        placeholder="Friend name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required={true}
      />

      <label>🌄 Image url</label>
      <input
        type="text"
        value={image}
        placeholder={dummyUrl}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />

      <Button>Add</Button>
    </form>
  );
}

function AddTransactionForm({ friend, onBillPayment, onDeleteFriend }) {
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payingBill, setPayingBill] = useState("user");

  const friendExpense = billValue === "" ? billValue : billValue - yourExpense;

  function handleBillPayment(e) {
    e.preventDefault();
    if (!billValue) return;
    onBillPayment(billValue, +yourExpense, payingBill);

    setBillValue("");
    setYourExpense("");
    setPayingBill("user");
  }

  function handleFriendDelete(e) {
    e.preventDefault();
    if (!friend) return;
    onDeleteFriend(friend.id);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name || "friend"}</h2>

      <label>💵 Bill value</label>
      <input
        type="number"
        placeholder="Total amount"
        value={billValue}
        onChange={(e) => {
          setBillValue((v) => {
            let value = +e.target.value || 0;
            if (value < 0) return 0;
            return value;
          });
          setYourExpense((v) => {
            let value = +e.target.value || 0;
            if (value < 0) return 0;
            return value * 0.5;
          });
        }}
      />

      <label>🙎‍♂️ Your expense</label>
      <input
        type="number"
        placeholder="Enter amount"
        value={+yourExpense.toFixed(2)}
        onChange={(e) => {
          setYourExpense(
            (v) =>
              (+e.target.value && Math.min(billValue, +e.target.value)) || 0
          );
        }}
      />

      <label>🦹‍♂️ {friend.name || "Friend"}'s expense</label>
      <input
        type="text"
        value={+(friendExpense || 0).toFixed(2)}
        placeholder="Amount.."
        disabled={true}
      />

      <label>🤑 Who is paying bill?</label>
      <select
        value={payingBill}
        onChange={(e) => {
          setPayingBill(e.target.value);
        }}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name || "Friend"}</option>
      </select>

      {friend?.id !== 1 ? (
        <Button idToAdd="deleteBtn" onClick={handleFriendDelete}>
          Delete Friend
        </Button>
      ) : (
        ""
      )}
      <Button onClick={handleBillPayment}>Split Bill</Button>
    </form>
  );
}

export { AddFriendForm, AddTransactionForm };
