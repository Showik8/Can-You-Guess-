import { useState } from "react";
import "./App.css";
import { Content } from "./content";
const App = () => {
  const [win, setWin] = useState(false);

  // let createNew = setTimeout(() => {
  //   secretNumber = makeSecretNum();
  // }, 2000);

  return (
    <>
      <Content win={win} setWin={setWin} />;
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
