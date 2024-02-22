import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generar una clave secreta segura
const secretKey = crypto.randomBytes(64).toString('hex');

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: "1d", // El token expira en 1 día
      },
      (err, token) => {
        if (err) reject(err); // Manejo de errores en la firma del token
        resolve(token); // Resuelve con el token generado
      }
    );
  });
};
