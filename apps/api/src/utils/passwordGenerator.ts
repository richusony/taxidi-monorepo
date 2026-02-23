import argon2 from "argon2";

export async function generatePassword(password: string) {
    return await argon2.hash(password);
}

export async function verifyPassword(dbPassword: string, inputPassword: string) {
    return await argon2.verify(dbPassword, inputPassword);
}