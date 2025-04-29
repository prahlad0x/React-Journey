import { useState } from "react";
import { FriendList } from "./Friend";
import { AddFriendForm, AddTransactionForm } from "./Form";
import Button from "./Button";

function App() {
  const [friends, setFriends] = useState(() => {
    const data = localStorage.getItem("splitwise-friends");
    return data
      ? JSON.parse(data)
      : [
          {
            id: 1,
            name: "Kushwah Ji",
            image: `https://i.pravatar.cc/48?u=1745949143179`,
            balance: 0,
          },
        ];
  });
  const [isAddFriendOpen, setAddFriendOpen] = useState(false);
  const [isBillOpen, setBillOpen] = useState(null);

  const { toTake, toGive } = friends.reduce(
    (acc, friend) => {
      if (friend.balance < 0) {
        acc.toGive += Math.abs(friend.balance);
      } else if (friend.balance > 0) {
        acc.toTake += Math.abs(friend.balance);
      }
      return acc;
    },
    { toTake: 0, toGive: 0 }
  );

  const currentBill = friends.find((friend) => friend.id === isBillOpen);

  function handleAddFriendStatus() {
    setAddFriendOpen(!isAddFriendOpen);
  }

  function handleAddFriend(name, image) {
    if (!image || !name) return;
    let isFriendExist = friends.find((friend) => friend.name === name);
    if (isFriendExist) {
      setBillOpen(isFriendExist.id);
      setAddFriendOpen(false);
    } else {
      let id = new Date().getTime();
      image = `${image}?u=${id}`;

      setFriends((data) => {
        localStorage.setItem(
          "splitwise-friends",
          JSON.stringify([...data, { id, image, name, balance: 0 }])
        );
        return [...data, { id, image, name, balance: 0 }];
      });

      setAddFriendOpen(false);
      setBillOpen(id);
    }
  }

  function handleBillPayment(bill, userAmount, doneBy) {
    if (!bill || !doneBy) return;

    let total = bill - userAmount;
    if (doneBy !== "user") {
      total = total - bill;
    }
    setFriends((data) => {
      let updatedData = data.map((el) => {
        if (el.id === isBillOpen) {
          return {
            ...el,
            balance: el.balance + total,
          };
        }
        return el;
      });
      localStorage.setItem("splitwise-friends", JSON.stringify(updatedData));
      return updatedData;
    });

    setBillOpen(null);
  }

  function handleDeleteFriend(id) {
    setFriends((data) => {
      let updatedData = data.filter((friend) => friend.id !== id);
      localStorage.setItem("splitwise-friends", JSON.stringify(updatedData));
      return updatedData;
    });
    setBillOpen(null);
  }

  return (
    <>
      <div className="header">
        <h1>Splitwise</h1>
        <h2>
          <span className="green">{toTake > 0 && `₹${+toTake.toFixed(2)} ↑↑`}</span>
          <span className="red">{toGive >= 0 && `₹${+toGive.toFixed(2)} ↓↓`}</span>
        </h2>
      </div>
      <hr />
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            onBillOpen={setBillOpen}
            isOpen={isBillOpen}
          />

          <AddFriendForm
            isOpen={isAddFriendOpen}
            onAddFriend={handleAddFriend}
          />

          <Button onClick={handleAddFriendStatus}>
            {isAddFriendOpen ? "Close" : "Add Friend"}
          </Button>
        </div>

        {isBillOpen && (
          <AddTransactionForm
            friend={currentBill}
            onBillPayment={handleBillPayment}
            key={isBillOpen}
            onDeleteFriend={handleDeleteFriend}
          />
        )}
      </div>
    </>
  );
}

export default App;
