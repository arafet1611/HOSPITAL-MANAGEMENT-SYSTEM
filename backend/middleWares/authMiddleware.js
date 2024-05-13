import jwt from "jsonwebtoken";
import Employee from "../model/employeeModel.js";
import Admin from "../model/adminModel.js";
const protectByRole = (allowedRoles) => async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Employee.findById(decoded.id).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      if (!allowedRoles.includes(user.job)) {
        res.status(401);
        throw new Error("Not authorized for this action");
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).send({ error: "Not authorized, no token provided" });
  }
};
export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        throw new Error("Admin not found");
      }

      req.user = admin;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).send({ error: "Not authorized, no token provided" });
  }
};

export const protectDoctor = protectByRole(["doctor"]);
export const protectNurse = protectByRole(["nurse"]);
export const protectHumanResource = protectByRole(["human resource"]);
export const protectSecretary = protectByRole(["secretary"]);
