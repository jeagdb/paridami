import React, { useState, useCallback } from "react";
import Input from '../Commons/Input';
import useAuth from '../../services/api-authentication';

function FormSignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const authenticationService = useAuth();

  const handleNameChange = useCallback((name) => setName(name), []);
  const handlePasswordChange = useCallback((password) => setPassword(password),[]);

  const handlePostSignUp = () => {
    setIsNotificationShown(false);
    if (password.length < 5) {
      setIsNotificationShown(true);
      setError('Mot de passe trop court : minimum 5');
    } else {
      authenticationService.signUp({ name, password });
    }
  };

  return (
    <>
    <div className="d-flex">
      <div>
      <h5 className="text-center">S'inscrire</h5>
        <div className="np-form-group">
          <label>Nom</label>
          <Input className="np-form-element np-text-accent" placeholder="nom..." value={name} onChange={handleNameChange}/>
        </div>
        <div className="np-form-group">
          <label>Mot de passe</label>
          <Input type="password" className="np-form-element np-text-accent" placeholder="mot de passe... (> 5)" value={password} onChange={handlePasswordChange}/>
          {isNotificationShown && (<div className="np-element np-text-warn">{error}</div>)}
        </div>
      </div>
    <button type="submit" className="flex-grow-1 np-btn" onClick={handlePostSignUp}>👶</button>
    </div>
    </>
  );
}

export default FormSignUp;