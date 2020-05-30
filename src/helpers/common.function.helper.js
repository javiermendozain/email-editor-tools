import { useState } from "react";
import { isEmpty } from ".";
import * as moment from "moment";
moment().locale("es");

const sha256 = require("crypto-js");

export const useFormInput = (init) => {
  const [value, setvalue] = useState(init);
  return {
    value,
    onChange: (e) => setvalue(e.target.value),
  };
};

export const UpperCaseFirstLetter = (text) =>
  !isEmpty(text) ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;

// Generate hash by object
export const GenerateHash = (object) =>
  sha256.SHA256(JSON.stringify(object), "sha256").toString();

// Compare than twe object are same
export const isEqual = (objectFirst, objectSecond) =>
  sha256.SHA256(JSON.stringify(objectFirst), "sha256").toString() ===
  sha256.SHA256(JSON.stringify(objectSecond), "sha256").toString();

// Get differencies between two objects
export const getDiffObjects = (objectFirst, objectSecond) =>
  Object.keys(objectSecond).reduce((diff, key) => {
    // If the values are same return element
    if (objectFirst[key] === objectSecond[key]) return diff;

    // return the key and the new value of second object
    return {
      ...diff,
      [key]: objectSecond[key],
    };
  }, {});

export const GetDateComplete = (text, divider = "-") => {
  const date = new Date(text || "");

  const twoDigites = (text) => (text < 10 ? `0${text}` : text);

  const hours = (hour) => {
    if (hour >= 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    return hour;
  };

  return `${date.getDate()}${divider}${twoDigites(
    date.getMonth() + 1
  )}${divider}${date.getFullYear()} ${twoDigites(
    hours(date.getHours())
  )}:${twoDigites(date.getMinutes())}:${twoDigites(date.getSeconds())} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;
};

export const GetDate = (text, divider = "-") => {
  const date = text ? new Date(text) : new Date();

  const twoDigites = (text) => (text < 10 ? `0${text}` : text);

  return `${date.getFullYear()}${divider}${twoDigites(
    date.getMonth() + 1
  )}${divider}${twoDigites(date.getDate())}`;
};

/*
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
*/

export const sumScore = (challenges) => {
  let result = 0;
  Object.keys(challenges || {}).map((key) => {
    // Only desafio have score for ranking
    if (challenges[key].ChallengeType === "desafio") {
      result += parseInt(challenges[key].Score);
    }
    return;
  });

  return result;
};

export const getExtensionFile = (nameFile) => {
  const blobs = nameFile.split(".");
  return blobs[blobs.length - 1].toLowerCase().trim();
};

export const GetDifferenceDateOnChallenge = (dateInit, dateFinish) => {
  const {
    date: dateStart,
    time: { hour: hourStar, minute: minuteStart },
  } = dateInit;
  const {
    date: dateEnd,
    time: { hour: hourEnd, minute: minuteEnd },
  } = dateFinish;
  const today = GetDate("");
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();

  const now = moment(today).set("hour", hour).set("minute", minute);

  const initDate = moment(dateStart)
    .set("hour", hourStar)
    .set("minute", minuteStart);

  const finishDate = moment(dateEnd)
    .set("hour", hourEnd)
    .set("minute", minuteEnd);

  const diffInit = initDate.diff(now, "minute");
  const diffFinish = finishDate.diff(now, "minute");

  return {
    diffInit,
    diffFinish,
    initDate,
    finishDate,
  };
};

export const IsStatusChallenge = (dateInit, dateFinish) => {
  const { diffInit, diffFinish } = GetDifferenceDateOnChallenge(
    dateInit,
    dateFinish
  );

  if (diffInit < 0 && diffFinish > 0) {
    /**
     * NOTE: Ya inicio y no ha finalizado
     * diffInit (min): desde que inició
     * diffFinish (min) para finalizar
     */
    return "Activo";
  }

  if (diffFinish < 0) {
    // Ya finalizó: diffFinish (minut) desde que finalizó
    return "Pasado";
  }

  if (diffInit > 0) {
    // Aún no ha iniciado, diffInit (minut) faltante para iniciar
    return "Próximo";
  }

  return "-";
};

export const NameToURLName = (text) => {
  let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    name = `${text}`;

  for (let i = 0; i < from.length; i++) {
    name = name.split(from.charAt(i)).join(to.charAt(i));
  }

  return name.split(" ").join("-").toLowerCase();
};
