import { useEffect, useRef, useState } from "react";

import "./App.css";

export const Content = ({ win, setWin, secretNumber }) => {
  const [textOfGuess, setTextOfGUess] = useState("What's hidden there?");
  const [hint, setHint] = useState(null);
  const [haveTry, setHaveTry] = useState(true);
  const [tryAmount, setTryAmount] = useState(10);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  let inputValue = inputRef.current?.value;

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    checkINP();
  }, [inputValue]);

  function checkINP() {
    if (secretNumber == inputValue) {
      setTextOfGUess("Congratulation You Win 🥳🥳🥳 ");
      setWin(true);
      setHint(null);
      setHaveTry(false);
    }

    if (inputValue > secretNumber && !win) {
      setHint(`The number you entered is higher than my Secret Number.`);
    } else if (inputValue < secretNumber && !win) {
      setHint(`The number you entered is less than my Secret Number.`);
    }
  }

  function restart() {
    inputValue = null;
    setTextOfGUess("What's hidden there?");
    setHint(null);
    setTryAmount(10);
    setHaveTry(true);
    setLoading(true);
    setWin(false);
    secretNumber = makeSecretNum(Math.random());
  }

  function submit() {
    setTryAmount((pre) => pre - 1);

    if (win) {
      setHaveTry(false);
    }

    if (tryAmount <= 1) {
      setHaveTry(false);
      setTextOfGUess("You lose 🥺");
    }
  }

  return (
    <>
      {loading ? (
        <div className="loadingWrapper">
          <div className="loader"></div>
          <span className="Thinking">I'm Thinking 🤔</span>
        </div>
      ) : (
        <div className="content">
          <h1>{textOfGuess}</h1>

          {!win ? (
            <h2>
              Number is between 0 to 20
              <br />
              {`you have ${tryAmount} try`}
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
            <button onClick={haveTry ? submit : restart}>
              {haveTry ? "Submit" : "Try Again"}
            </button>
            <span>{hint}</span>
          </div>
        </div>
      )}
    </>
  );
};
