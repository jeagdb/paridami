import React, { useState } from "react";
import FormRoomCreation from './FormRoomCreation';
import FormRoomConnexion from './FormRoomConnexion';

export default function FormRoom() {
  const [creationMode, setCreationMode] = useState(false);

  return (
    <div class="mt-5">
    {creationMode
    ? <>
      <FormRoomCreation/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => { setCreationMode(!creationMode) }}>Rejoindre une room</button>
      </div>
    </>
    : <>
      <FormRoomConnexion/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => setCreationMode(!creationMode)}>Créer une room</button>
      </div>
    </>
    }
    </div>
  );
}