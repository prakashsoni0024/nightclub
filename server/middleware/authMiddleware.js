import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectAdmin = async (
  req,
  res,
  next
) => {

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token =
        req.headers.authorization.split(" ")[1];
    }

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }



    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );



    const user = await User.findById(
      decoded.userId
    ).select("-password");



    if (!user || user.role !== "admin") {

      return res.status(401).json({
        success: false,
        message: "Admin access denied",
      });
    }



    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};