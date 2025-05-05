import { useState } from "react";
import Content from "./Content";
import "./App.css";
const App = () => {
  const [win, setWin] = useState(false);

  return (
    <>
      <Content win={win} setWin={setWin} />
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
