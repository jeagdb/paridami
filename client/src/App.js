import './css/App.css';
import Timer from './components/Timer';
import FormRoom from './components/Forms/FormRoom';
import FormSign from './components/Forms/FormSign';
import Header from './components/Header';

import React, { useState } from "react";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      <Header/>
      <FormRoom/>
      <FormSign/>
    </>
  );
}

export default App;