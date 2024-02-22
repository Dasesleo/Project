import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generar una clave secreta segura
const secretKey = crypto.randomBytes(64).toString('hex');

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  // Verificar si el token está presente en las cookies de la solicitud
  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado", // Envía un mensaje de error si no hay token
    });
  }

  // Verificar la validez del token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "No estás autorizado", // Envía un mensaje de error si el token no es válido
      });
    }

    // Si el token es válido, se decodifica para obtener la información del usuario
    req.userId = decoded.id; // Se guarda el ID del usuario en el objeto de solicitud para su posterior uso
    next(); // Pasar al siguiente middleware/ruta
  });
};
