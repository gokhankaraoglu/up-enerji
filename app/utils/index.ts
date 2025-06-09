import { useState } from "react";
import { Credentials, IWalletData, User } from "../types";

export function capitalize(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatName(name: string): string {
  const exceptions = ["IMEI", "T.C.", "A.Ş."];

  return name
    ?.split(" ")
    .map((word) => {
      if (exceptions.includes(word)) {
        return word;
      }
      return (
        word.charAt(0).toLocaleUpperCase("tr-TR") +
        word.slice(1).toLocaleLowerCase("tr-TR")
      );
    })
    .join(" ");
}

export const setSessionStorage = <T>(key: string, value: T): void => {
  try {
    const jsonValue = JSON.stringify(value || "");
    sessionStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving to sessionStorage with key "${key}":`, error);
  }
};

export const getSessionStorage = <T>(key: string): T | undefined => {
  try {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue === null) {
      return undefined;
    }
    return JSON.parse(jsonValue) as T;
  } catch (error) {
    console.error(
      `Error reading from sessionStorage with key "${key}":`,
      error
    );
    return undefined;
  }
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createExpirationDate = (hours: number): Date => {
  const expirationDate = new Date();
  const milliseconds = hours * 60 * 60 * 1000;
  expirationDate.setTime(expirationDate.getTime() + milliseconds);
  return expirationDate;
};

export const base64ToUint8Array = (base64: string) => {
  const raw = atob(base64);
  const uint8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
};

export const notifyAppLoadSuccess = ({
  status,
  policeGuid,
}: {
  status: string;
  policeGuid: string;
}): void => {
  const onLoadEvent = window?.OnLoadEvent;
  const iwalletData: IWalletData = {
    status,
    data: {
      police_guid: policeGuid,
    },
  };
  if (onLoadEvent) {
    onLoadEvent.postMessage(iwalletData);
  } else {
    console.warn(
      "OnLoadEvent.postMessage method is unavailable or not a function."
    );
  }
};
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

export function convertToISODate(dateString: string): string | null {
  const parts = dateString.split("/");
  if (parts.length !== 3) return null; // Format kontrolü

  const [day, month, year] = parts.map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date.toLocaleDateString("en-CA");
}

export const userToCredentials = (user: User): Credentials => {
  const phoneWithoutCountryCode = user.phoneNumber?.startsWith("90")
    ? user.phoneNumber.substring(2)
    : user.phoneNumber;

  if (user.taxNumber) {
    return {
      VKN: user.taxNumber,
      CEPTEL: phoneWithoutCountryCode,
      EMAIL: user.email,
    } as Credentials;
  }
  if (user.identityNumber) {
    return {
      TCK: user.identityNumber,
      DGMTAR: user.birthDate || undefined,
      CEPTEL: phoneWithoutCountryCode,
      EMAIL: user.email,
    } as Credentials;
  }
  return {} as Credentials;
};
