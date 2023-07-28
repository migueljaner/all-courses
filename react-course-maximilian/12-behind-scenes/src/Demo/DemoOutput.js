import React from "react";

const DemoOutput = (props) => {
  console.log("DEMOOUTPUT RUNNING"); // This will run on every re-evaluation of the component  (when the state changes)
  return <p>{props.show ? "This is new!" : ""}</p>;
};

export default React.memo(DemoOutput);
