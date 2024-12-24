import { useState } from "react";
import { Button, ModalButton } from "./Button";
import Step from "./Steps";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
  "Paisa Hi Paisa Ho Ga",
  "Fir Wo Paisa Laxmi Chitfund Me Dalenge",
  "21 Din Me Paisa Double",
    "Then Buy A New House",
    "Buy A New Car (G-Wagon)",
    "Mja ni life...🤑",
];
export default function App() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(true);

  const decrement = function () {
    if (!current) return;
    setCurrent((el) => el - 1);
  };

  const increment = function () {
    if (current === messages.length - 1) return;
    setCurrent((el) => el + 1);
  };

  function handleModalDisplay() {
    setShowModal((el) => !el);
  }

  function handlerStep(s) {
    if (s === current) return;
    setCurrent(s);
  }
  return (
    <>
      <div>
        <ModalButton callFn={handleModalDisplay} showModal={showModal} />
        {showModal && (
          <div className="steps">
            <div className="numbers">
              {messages?.length > 0 &&
                messages.map((_, i) => (
                  <Step 
                    step={i + 1}
                    active={current >= i}
                    key={i}
                    handleStep={handlerStep}
                  />
                ))}
            </div>

            <p className="message">{messages[current] || "Hello world!"}</p>

            <Button
              incFn={increment}
              decFn={decrement}
              isFirst={current === 0}
              isLast={current === messages.length - 1}
            />
          </div>
        )}
      </div>
    </>
  );
}
