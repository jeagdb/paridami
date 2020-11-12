import React, { useState, useCallback } from "react";
import Input from '../Commons/Input';
import useAuth from '../../services/api-authentication';

//Login
export default function FormSignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const authenticationService = useAuth();

  const handleNameChange = useCallback((name) => setName(name), []);
  const handlePasswordChange = useCallback((password) => setPassword(password),[]);

  const handlePostSignIn = () => {
    setIsNotificationShown(false);
    if (password.length < 5) {
      setIsNotificationShown(true);
      setError('Mot de passe incorrect.');
    } else {
      authenticationService.signIn({ name, password });
    }
  };

  return (
    <>
    <div className="d-flex">
      <div>
      <h5 className="text-center">Se connecter</h5>
        <div className="np-form-group">
          <label for="np-element">Nom</label>
            <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
        </div>
        <div className="np-form-group">
          <label for="np-element">Mot de passe</label>
          <Input className="np-form-element np-text-accent" placeholder="mot de passe..." value={password} onChange={handlePasswordChange}/>
          {isNotificationShown && (<div className="np-element np-text-warn">{error}</div>)}
        </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostSignIn}>🤑</button>
    </div>
    </>
  );
}
