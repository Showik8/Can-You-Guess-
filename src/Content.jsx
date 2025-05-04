import { useEffect, useRef, useState } from "react";

import "./App.css";

function makeSecretNum(n = 0.5) {
  return Number((n + Math.random() * 15).toFixed());
}
let secretNumber = makeSecretNum();

export const Content = ({ win, setWin }) => {
  const [gameState, setGameState] = useState({
    textOfGuess: "What's hidden there?",
    hint: null,
    haveTry: true,
    tryAmount: 10,
    loading: true,
  });

  const inputRef = useRef();
  let inputValue = inputRef.current?.value;

  if (gameState.loading) {
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        loading: false,
      }));
    }, 3000);
  }

  useEffect(() => {
    checkINP();
  }, [inputValue]);

  function checkINP() {
    if (secretNumber == inputValue && inputValue != null) {
      setWin(true);
      setGameState((prev) => ({
        ...prev,
        textOfGuess: "Congratulation You Win 🥳🥳🥳 ",
        hint: null,
        haveTry: false,
      }));
    }

    if (inputValue > secretNumber && !win) {
      setGameState((pre) => ({
        ...pre,
        hint: "The number you entered is higher than my Secret Number.",
      }));
    } else if (inputValue < secretNumber && !win) {
      setGameState((pre) => ({
        ...pre,
        hint: "The number you entered is less than my Secret Number.",
      }));
    }
  }

  function restart() {
    inputValue = null;
    setWin(false);
    setGameState((pre) => ({
      ...pre,
      textOfGuess: "What's hidden there?",
      hint: null,
      tryAmount: 10,
      haveTry: true,
      loading: true,
    }));
    const random = Math.random();
    secretNumber = makeSecretNum(random);
  }

  function submit() {
    setGameState((pre) => ({
      ...pre,
      tryAmount: pre.tryAmount - 1,
    }));

    if (win) {
      setGameState((pre) => ({
        ...pre,
        haveTry: false,
      }));
    }

    if (gameState.tryAmount <= 1) {
      setGameState((pre) => ({
        ...pre,
        haveTry: false,
        textOfGuess: "You lose 🥺",
      }));
    }
  }

  return (
    <>
      {gameState.loading ? (
        <div className="loadingWrapper">
          <div className="loader"></div>
          <span className="Thinking">I'm Thinking 🤔</span>
        </div>
      ) : (
        <div className="content">
          <h1>{gameState.textOfGuess}</h1>

          {!win ? (
            <h2>
              Number is between 0 to 20
              <br />
              {`you have ${gameState.tryAmount} try`}
            </h2>
          ) : (
            <h2>Number Was {secretNumber}</h2>
          )}

          <input
            type="number"
            placeholder="Try to guess my number "
            ref={inputRef}
          />
          <div>
            <button onClick={gameState.haveTry ? submit : restart}>
              {gameState.haveTry ? "Submit" : "Try Again"}
            </button>
            <span>{gameState.hint}</span>
          </div>
        </div>
      )}
    </>
  );
};
