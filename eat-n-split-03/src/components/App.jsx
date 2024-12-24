import { useState } from "react";
import { FriendList } from "./Friend";
import { AddFriendForm, AddTransactionForm } from "./Form";
import Button from "./Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isAddFriendOpen, setAddFriendOpen] = useState(false);
  const [isBillOpen, setBillOpen] = useState(null);

  const currentBill = friends.find((friend) => friend.id === isBillOpen);

  function handleAddFriendStatus() {
    setAddFriendOpen(!isAddFriendOpen);
  }

  function handleAddFriend(name, image) {
    if (!image || !name) return;
    let id = new Date().getTime();
    image = `${image}?u=${id}`;

    setFriends([...friends, { id, image, name, balance: 0 }]);
    setAddFriendOpen(false);
    setBillOpen(id);
  }

  function handleBillPayment(bill, userAmount, doneBy) {
    if (!bill || !doneBy) return;

    let total = bill - userAmount;

    if (doneBy !== "user") {
      total = total - bill;
    }

    setFriends((data) =>
      data.map((el) => {
        if (el.id === isBillOpen) {
          return {
            ...el,
            balance: el.balance + total,
          };
        }
        return el;
      })
    );

    setBillOpen(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onBillOpen={setBillOpen}
          isOpen={isBillOpen}
        />

        <AddFriendForm isOpen={isAddFriendOpen} onAddFriend={handleAddFriend} />

        <Button onClick={handleAddFriendStatus}>
          {isAddFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>

      {isBillOpen && (
        <AddTransactionForm
          friend={currentBill}
          onBillPayment={handleBillPayment}
          key={isBillOpen}
        />
      )}
    </div>
  );
}

export default App;
