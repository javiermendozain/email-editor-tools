const firebaseKeys = {
  apiKey: process?.env?.REACT_APP_apiKey?.toString(),
  authDomain: process?.env?.REACT_APP_authDomain?.toString(),
  databaseURL: process?.env?.REACT_APP_databaseURL?.toString(),
  projectId: process?.env?.REACT_APP_projectId?.toString(),
  storageBucket: process?.env?.REACT_APP_storageBucket?.toString(),
  messagingSenderId: process?.env?.REACT_APP_messagingSenderId?.toString(),
  appId: process?.env?.REACT_APP_appId?.toString(),
  measurementId: process?.env?.REACT_APP_measurementId?.toString(),
};

export default firebaseKeys;
/*
    Requiere agregar consentimientos de OAuth,
    Links a sitios autorizado donde se encuentran las politicas de privacidad
    ademas de los terminos y condiciones!
*/
