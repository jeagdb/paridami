import React, { useState } from "react";
import FormSignUp from '../../components/Forms/FormSignUp';
import FormSignIn from '../../components/Forms/FormSignIn';

export default function Sign() {
  console.log("HERE");
  const [registerMode, setRegisterMode] = useState(false);

  return (
    <div className="mt-5">
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