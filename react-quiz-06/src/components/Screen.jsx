import { RestartButton, StartButton } from "./Button";

function StartScreen({ totalQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{totalQuestions} question to test your React mastery</h3>
      <StartButton dispatch={dispatch} />
    </div>
  );
}

function FinishScreen({ points, totalPoints, dispatch, highScore }) {
  const percentage = points ? (points / totalPoints) * 100 : 0;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {totalPoints} (
        {percentage.toFixed(2)}%)
      </p>
      <RestartButton dispatch={dispatch} />
    </>
  );
}

export { StartScreen, FinishScreen };
