import { useState } from "react";
import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const initialState = { questions: [], status: "loading" };

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "fetchFailed":
      return {
        ...state,
        status: "error",
      };
  }
}

function App() {
  const [questions, dispatch] = useReducer(reducer, initialState);
  useState(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:9000/questionss");

      if (!res.ok) {
        dispatch({ type: "fetchFailed", payload: res.error });
      }

      const resData = await res.json();

      dispatch({ type: "dataReceived", payload: resData });
    }
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Main></Main>
      </main>
    </>
  );
}

export default App;
