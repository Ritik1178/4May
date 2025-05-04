import React, { useState } from "react";

// Deeply nested child
const BottomMainRight = ({ name }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid #ccc" }}>
      <h3>BottomMainRight Component</h3>
      <p>Hello, <strong>{name || "Anonymous"}</strong>!</p>
    </div>
  );
};

// Nested component
const BottomMain = ({ name }) => {
  return (
    <div style={{ marginTop: "10px", padding: "10px", border: "1px dashed #999" }}>
      <h2>BottomMain Component</h2>
      <BottomMainRight name={name} />
    </div>
  );
};

// Intermediate component
const Main = ({ name }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid black" }}>
      <h1>Main Component</h1>
      <BottomMain name={name} />
    </div>
  );
};

// Top-level App
function App() {
  const [name, setName] = useState("");

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Props Drilling Demo</h1>
      <label>
        Enter your name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
        />
      </label>

      <hr />
      <Main name={name} />
    </div>
  );
}

export default App;
