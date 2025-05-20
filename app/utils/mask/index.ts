export const normalizeCardNumber = (value: string) => {
  return value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");
};

export const normalizeCardDate = (value: string) => {
  return value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .substring(0, 5);
};

export const normalizeTCKN = (value: string) => {
  return value.replace(/[^0-9]/gi, "").substring(0, 11);
};

export const normalizePhoneNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "$1$2$3")
    .substring(0, 10);
};

export const normalizeIMEINumber = (value: string) => {
  return value.replace(/\D/g, "").substring(0, 15);
};

export const normalizeEmail = (value: string) => {
  return value.trim().toLowerCase();
};

export const isValidTCKN = (value?: string) => {
  if (!value) return false;
  const normalizedTCKN = normalizeTCKN(value);

  if (normalizedTCKN.length !== 11) return false;

  if (normalizedTCKN[0] === "0") return false;

  if (/^(\d)\1+$/.test(normalizedTCKN)) return false;

  const digits = normalizedTCKN.split("").map(Number);

  const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
  const checksum10 = (sumOdd * 7 - sumEven) % 10;

  if (checksum10 !== digits[9]) return false;

  const checksum11 =
    digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

  if (checksum11 !== digits[10]) return false;

  return true;
};

export const isValidPhoneNumber = (value?: string) => {
  if (!value) return false;
  const normalizedPhoneNumber = normalizePhoneNumber(value);

  return (
    normalizedPhoneNumber.length === 10 && normalizedPhoneNumber.startsWith("5")
  );
};

export const isValidEmail = (value: string) => {
  const normalizedEmail = normalizeEmail(value);

  if (normalizedEmail.length === 0) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(normalizedEmail);
};

export const isValidIMEINumber = (value?: string) => {
  if (!value) return false;

  const normalizedIMEINumber = normalizeIMEINumber(value);

  if (normalizedIMEINumber.length !== 15) return false;
};
