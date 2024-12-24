function Button({ incFn, decFn, isLast = false, isFirst = false }) {
  const styleObj = {
    backgroundColor: "#7950f2",
    color: "#FFFFFF",
  };
  return (
    <div className="buttons">
      <button
        className="button"
        style={(isFirst && {}) || styleObj}
        onClick={decFn}
        disabled={isFirst}
      >
        <span>Previous</span>
      </button>

      <button
        className="button"
        style={(isLast && {}) || styleObj}
        onClick={incFn}
        disabled={isLast}
      >
        <span>Next</span>
      </button>
    </div>
  );
}

function ModalButton({ showModal, callFn }) {
  return showModal ? (
    <button className="close" onClick={callFn}>
      {" "}
      &times;
    </button>
  ) : (
    <button className="close" onClick={callFn}>
      {" "}
      &#61;
    </button>
  );
}

export { ModalButton, Button };
