import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generar una clave secreta segura
const secretKey = crypto.randomBytes(64).toString('hex');

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: "No estás autorizado",
      });

    req.userId = decoded.id;
    next();
  });
};
