import React, { useState, useCallback } from "react";
import Input from '../Commons/Input';

export default function FormDealCreation() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const handleNameChange = useCallback((name) => setName(name), []);
  const handlePostDealCreation = () => {
    if (name.length < 1) {
      setIsNotificationShown(true);
      setError('Nom du pari invalide.');
    } else {
      console.log("name :", name);
      //creation + connexion
    }
  }

  return (
    <>
    <div className="d-flex">
      <div>
        <h5 className="text-center">Créer un pari</h5>
        <div className="np-form-group">
        <label for="np-element">Nom du pari</label>
          <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
          {isNotificationShown && (<div className="np-element np-text-warn">{error}</div>)}
          </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostDealCreation}>🚪🔑</button>
    </div>
    </>
  );
}
