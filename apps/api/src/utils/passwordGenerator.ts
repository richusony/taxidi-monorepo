import argon2 from 'argon2';

export async function generatePasswordHash(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(
  dbPassword: string,
  inputPassword: string,
) {
  return await argon2.verify(dbPassword, inputPassword);
}

import crypto from 'crypto';

type PasswordOptions = {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
};

function getRandomChar(charSet: string): string {
  const randomIndex = crypto.randomInt(0, charSet.length);
  return charSet[randomIndex];
}

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateStrongPassword(options: PasswordOptions = {}): string {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
  } = options;

  if (length < 8) {
    throw new Error('Password length must be at least 8 characters.');
  }

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let characterPool = '';
  const requiredChars: string[] = [];

  if (includeUppercase) {
    characterPool += uppercase;
    requiredChars.push(getRandomChar(uppercase));
  }

  if (includeLowercase) {
    characterPool += lowercase;
    requiredChars.push(getRandomChar(lowercase));
  }

  if (includeNumbers) {
    characterPool += numbers;
    requiredChars.push(getRandomChar(numbers));
  }

  if (includeSymbols) {
    characterPool += symbols;
    requiredChars.push(getRandomChar(symbols));
  }

  if (!characterPool) {
    throw new Error('At least one character type must be selected.');
  }

  const remainingLength = length - requiredChars.length;
  const passwordChars = [...requiredChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(getRandomChar(characterPool));
  }

  return shuffleArray(passwordChars).join('');
}
