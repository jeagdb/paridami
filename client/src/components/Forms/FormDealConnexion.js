import React, { useState, useCallback } from "react";
import Input from '../Commons/Input';

function FormDealConnexion() {
  const [name, setName] = useState('');
  const [dealId, setDealId] = useState('');
  const [error, setError] = useState('');
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const handleNameChange = useCallback((name) => setName(name), []);
  const handleDealIdChange = useCallback((dealId) => setDealId(dealId),[]);
  const handlePostDealConnexion = () => {
    setIsNotificationShown(false);
    if (dealId.length < 5) {
      setIsNotificationShown(true);
      setError('id du pari invalide.');
    } else {
      //connexion
    }
  };

  return (
    <>
    <div className="d-flex">
      <div>
      <h5 className="text-center">Rejoindre un pari</h5>
        <div className="np-form-group">
          <label>Nom</label>
            <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
        </div>
        <div className="np-form-group">
          <label>Id du pari</label>
          <Input className="np-form-element np-text-accent" placeholder="deal id..." value={dealId} onChange={handleDealIdChange}/>
          {isNotificationShown && (<div className="np-element np-text-warn">{error}</div>)}
        </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostDealConnexion}>🚪🚶</button>
    </div>
    </>
  );
}

export default FormDealConnexion;