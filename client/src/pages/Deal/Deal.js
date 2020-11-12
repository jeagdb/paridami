import React, { useState } from "react";
import FormDealCreation from '../Forms/FormDealCreation';
import FormDealConnexion from '../Forms/FormDealConnexion';

export default function Deal() {
  const [creationMode, setCreationMode] = useState(false);

  return (
    <div class="mt-5">
    {creationMode
    ? <>
      <FormDealCreation/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => { setCreationMode(!creationMode) }}>Rejoindre un pari</button>
      </div>
    </>
    : <>
      <FormDealConnexion/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => setCreationMode(!creationMode)}>Créer un pari</button>
      </div>
    </>
    }
    </div>
  );
}