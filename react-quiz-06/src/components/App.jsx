import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen, FinishScreen } from "./Screen";
import Question from "./Question";
import { NextButton, PreviousButton } from "./Button";
import ProgressBar from "./ProgressBar";
import Footer from "./Footer";
import Timer from "./Timer";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  currIdx: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  secondsRemaining: 60,
  answers: [],
  progress : 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.questions,
        status: "ready",
        totalPoints: action.questions.reduce((a, c) => c.points + a, 0),
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "setLoading":
      return { ...state, status: "loading" };

    case "start":
      return {
        ...state,
        status: "active",
        currIdx: 0,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.currIdx);
      const answers = state.answers;
      answers[state.currIdx] = action.answer;
      return {
        ...state,
        progress : state.progress + 1,
        answer: action.answer,
        answers: answers,
        points:
          action.answer === question.correctOption
            ? question.points + state.points
            : state.points,
      };

    case "prev":
      let prevIdx = state.currIdx - 1;
      return {
        ...state,
        currIdx: prevIdx,
      };

    case "next":
      let nextIdx = state.currIdx + 1;
      return {
        ...state,
        currIdx: nextIdx,
        progress : Math.max(nextIdx, state.progress)
      };

    case "finish":
      return {
        ...state,
        status: "finished",
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        answers : [],
        questions: state.questions,
        totalPoints: state.totalPoints,
      };

    case "reduceTime":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currIdx,
      totalPoints,
      points,
      secondsRemaining,
      answers,
      progress,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const answer = answers[currIdx] ?? null;
  useEffect(() => {
    const fetchQuestions = async () => {
      dispatch({ type: "setLoading" });
      try {
        const response = await fetch("http://localhost:9000/questions");

        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "dataReceived", questions: data });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {});

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              totalQuestions={totalQuestions}
              curr={currIdx + 1}
              progress={progress}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[currIdx]}
              dispatch={dispatch}
              answer={answer}
              key={currIdx}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={secondsRemaining} />
              <>
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  isFinished={currIdx + 1 === totalQuestions}
                />
                <PreviousButton dispatch={dispatch} isFirst={currIdx === 0} />
              </>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}
