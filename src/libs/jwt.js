import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generar una clave secreta segura
const secretKey = crypto.randomBytes(64).toString('hex');

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey, // Utiliza la clave secreta generada
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
