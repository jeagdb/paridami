import React, { useState, useCallback } from "react";
import Input from '../Input';

export default function FormConnexionRoom() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const handleNameChange = useCallback((name) => setName(name), []);
  const handleRoomIdChange = useCallback((roomId) => setRoomId(roomId),[]);
  const handlePostRoomConnexion = () => {
    setIsNotificationShown(false);
    if (roomId.length < 5) {
      setIsNotificationShown(true);
      setError('id de la room invalide.');
    } else {
      console.log("name :", name);
      console.log("roomId :", roomId);
      //connexion
    }
  };

  return (
    <>
    <div className="d-flex">
      <div>
      <h5 className="text-center">Rejoindre une room</h5>
        <div className="np-form-group">
          <label for="np-element">Nom</label>
            <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
        </div>
        <div className="np-form-group">
          <label for="np-element">Id de la room</label>
          <Input className="np-form-element np-text-accent" placeholder="room id..." value={roomId} onChange={handleRoomIdChange}/>
          {isNotificationShown && (<div className="np-element np-text-warn">{error}</div>)}
        </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostRoomConnexion}>🚪🚶</button>
    </div>
    </>
  );
}
