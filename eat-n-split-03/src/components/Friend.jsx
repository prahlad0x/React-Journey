import Button from "./Button";

function FriendList({ friends, onBillOpen, isOpen }) {
  return (
    <>
      <ul>
        {friends?.length > 0 &&
          friends.map((el) => (
            <Friend
              friend={el}
              key={el.id}
              isOpen={isOpen}
              onBillOpen={onBillOpen}
            />
          ))}
      </ul>
    </>
  );
}

function Friend({ friend, isOpen, onBillOpen }) {
  const isClose = isOpen !== friend.id;

  let message = `You and ${friend.name} are even`;
  let className = "";

  if (friend.balance < 0) {
    className = "red";
    message = `${friend.name} owes you ₹${+Math.abs(friend.balance).toFixed(2)}`;
  } else if (friend.balance > 0) {
    message = `You owe ${friend.name} ₹${+Math.abs(friend.balance).toFixed(2)}`;
    className = "green";
  }

  function handleBillOpen() {
    onBillOpen((id) => (id === friend.id ? null : friend.id));
  }

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={className}>{message}</p>
      <Button onClick={handleBillOpen}>{isClose ? "Select" : "Close"}</Button>
    </li>
  );
}

export { Friend, FriendList };
