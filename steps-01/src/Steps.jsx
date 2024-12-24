export default function Step({ active, step, handleStep }) {
  return (
    <div
      style={{cursor: 'pointer'}}
      className={(active && "active") || ""}
      onClick={() => {
        handleStep(step - 1);
      }}
    >
      {step}
    </div>
  );
}
