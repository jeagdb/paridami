import React, { useState } from "react";
import FormSignUp from './FormSignUp';
import FormSignIn from './FormSignIn';

export default function FormRoom() {
  const [registerMode, setRegisterMode] = useState(false);

  return (
    <div class="mt-5">
    {registerMode
    ? <>
      <FormSignUp/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => { setRegisterMode(!registerMode) }}>Se connecter</button>
      </div>
    </>
    : <>
      <FormSignIn/>
      <div>
        <button className="flex-grow-1 np-btn np-text-accent" onClick={() => setRegisterMode(!registerMode)}>S'inscrire</button>
      </div>
    </>
    }
    </div>
  );
}