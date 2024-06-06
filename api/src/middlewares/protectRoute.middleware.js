import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const secureRoutes = asyncHandler(async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies?.token;
  console.log("Token: ", token);
  if (!token) {
    return res.status(400).json({ errorMessage: "Unauthorized request" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
});

export { secureRoutes };
