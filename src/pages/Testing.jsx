import React, { useState } from "react";
import Axios from "axios";

function Testing() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addData = () => {
    Axios.post("https://localhost:5000/insert", {
      username: username,
      email: email,
      password: password
    });
  };

  return (
    <div>
      <h1>HELLO</h1>

      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Password:</label>
      <input
        type="text"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={addData}>Submit</button>
    </div>
  );
}

export default Testing;