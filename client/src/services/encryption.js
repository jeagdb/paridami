import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../config';

export const encrypt = (text) => {
  const res = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return res;
}
