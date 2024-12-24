import { useEffect } from "react";

export default function Timer({ dispatch, seconds }) {
    let second = seconds%60;
    let minutes = (seconds>0)?~~(seconds / 60) : 0;

  useEffect(() => {
    // Initialize timer
    const timer = setInterval(() => {
      dispatch({ type: "reduceTime" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className="timer">
        {`${minutes <10 ? 0 :""}${minutes}`} : {`${second <10 ? 0 :""}${second}`}
    </div>
  );
}
