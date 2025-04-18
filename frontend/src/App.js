import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <center>
      <div>
        <h1>Budget Allocation System</h1>
        
        <form method="POST">
          <button id="createBudget" type="submit"> Create a Budget </button>
        </form>

      </div>
    </center>
  );
}

export default App;