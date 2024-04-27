import Employee from "../model/employeeModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
const authEmployee = async (req, res) => {
  try {
    const { stud_email, password } = req.body;
    const user = await Employee.findOne({ stud_email });

    if (user) {
      const { hashPassword } = user;
      const verified = bcrypt.compareSync(password, hashPassword);
      if (verified) {
        res.status(201).json({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          stud_mobile: user.phone,
          stud_address: user.email,
          stud_pic: user.dateJoining,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { authEmployee };
