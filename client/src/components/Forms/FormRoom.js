import React, { useState } from "react";
import FormNewRoom from './FormNewRoom';
import FormConnexionRoom from './FormConnexionRoom';

export default function FormRoom() {
  const [creationMode, setCreationMode] = useState(false);

  return (
    <div class="mt-5">
    {creationMode
    ? <>
      <FormNewRoom/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => { setCreationMode(!creationMode) }}>Rejoindre une room</button>
      </div>
    </>
    : <>
      <FormConnexionRoom/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => setCreationMode(!creationMode)}>Créer une room</button>
      </div>
    </>
    }
    </div>
  );
}