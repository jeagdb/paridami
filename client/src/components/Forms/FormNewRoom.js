import React, { useState, useCallback } from "react";
import Input from '../Input';

export default function FormNewRoom() {
  const [name, setName] = useState('');

  const handleNameChange = useCallback((name) => setName(name), []);
  const handlePostRoomCreation = () => {
    console.log("name :", name);
    //creation + connexion
  }

  return (
    <>
    <div className="d-flex">
      <div>
        <h5 className="text-center">Créer une room</h5>
        <div className="np-form-group">
        <label for="np-element">Nom de la room</label>
          <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
          </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostRoomCreation}>🚪🔑</button>
    </div>
    </>
  );
}
