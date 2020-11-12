import './css/App.css';
import Timer from './components/Timer';
import Form from './components/Form';
import Header from './components/Header';

import React, { useState } from "react";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      <Header/>
      <Form/>
      <div class="np-element np-hover">
        <button class="np-btn" onClick={() => setLoadClient(prevState => !prevState)}>
            STOP
        </button>
        {loadClient ? <Timer/> : null}
      </div>
    </>
  );
}

export default App;