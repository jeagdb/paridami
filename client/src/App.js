import './css/App.css';
import Timer from './components/Timer';

import React, { useState } from "react";

function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <>
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        STOP
      </button>
      {loadClient ? <Timer/> : null}
    </>
  );
}

export default App;