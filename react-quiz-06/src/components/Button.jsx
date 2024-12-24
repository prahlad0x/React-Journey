function NextButton({ dispatch, answer, isFinished }) {
  return (
    <button
      disabled={answer === null}
      className="btn btn-ui"
      onClick={() => dispatch({ type: isFinished ? "finish" : "next" })}
    >
      {isFinished ? "Finish" : "Next"}
    </button>
  );
}

function PreviousButton({ dispatch, isFirst }) {
  if (isFirst) return null;
  return (
    <button
      style={{marginRight:"20px"}}
      className="btn btn-ui"
      onClick={() => dispatch({ type: "prev" })}
    >
      Prev
    </button>
  );
}

function StartButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "start" })} className="btn btn-ui">
      Let's start
    </button>
  );
}

function RestartButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart Quiz
    </button>
  );
}

export { NextButton, RestartButton, StartButton, PreviousButton };
