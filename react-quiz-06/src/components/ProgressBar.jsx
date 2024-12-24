export default function ProgressBar({
  curr,
  totalQuestions,
  points,
  totalPoints,
  answer,
  progress
}) {
  return (
    <header className="progress">
      <progress value={progress} max={totalQuestions} />
      <p>
        Question <strong>{curr}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
