import React, { useState } from "react";
import Output from "./Output";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);
  return (
    <>
      <h2>Greeting</h2>
      {!changedText && <Output>Great to see you!</Output>}
      {changedText && <Output> Changed!</Output>}
      <button onClick={() => setChangedText(true)}>Change Text</button>
    </>
  );
};

export default Greeting;
