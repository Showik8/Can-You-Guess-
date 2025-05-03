import { useState } from "react";
import "./App.css";
import { Content } from "./content";
const App = () => {
  function makeSecretNum(n = 0.5) {
    return Number((n + Math.random() * 15).toFixed());
  }

  const [win, setWin] = useState(false);
  let secretNumber = makeSecretNum();

  return (
    <>
      <Content
        win={win}
        setWin={setWin}
        secretNumber={secretNumber}
        makeSecretNum={makeSecretNum}
      />
      ;
      {win ? (
        <>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </>
      ) : null}
    </>
  );
};

export default App;
