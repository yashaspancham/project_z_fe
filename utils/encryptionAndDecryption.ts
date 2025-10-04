import CryptoJS from "crypto-js";

// Ideally, store this in an environment variable
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_STORING_STRING_IN_LOCALSTORE;


export const encryptString = (data: string): string => {
  if (SECRET_KEY === undefined) {
    return "";
  }
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};


export const decryptString = (encryptedString: string | null): string | null => {
  if (encryptedString === null || SECRET_KEY === undefined) {
    return null;
  }
  console.log('SECRET_KEY: ', SECRET_KEY);
  const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
