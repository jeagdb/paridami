import './css/App.css';
import Timer from './components/Timer';
import FormRoom from './components/Forms/FormRoom';
import Header from './components/Header';

import React, { useState } from "react";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      <Header/>
      <FormRoom/>
      <div className="np-element np-hover mt-5">
        <button className="np-btn" onClick={() => setLoadClient(prevState => !prevState)}>
            STOP
        </button>
        {loadClient ? <Timer/> : null}
      </div>
    </>
  );
}

export default App;