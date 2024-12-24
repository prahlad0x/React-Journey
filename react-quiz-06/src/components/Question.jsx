export default function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

function Option({ question, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option 
            ${answer === idx ? "answer" : ""} 
            ${
              isAnswered
                ? idx === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          key={idx}
          disabled={isAnswered}
          onClick={() => dispatch({ type: "newAnswer", answer: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
