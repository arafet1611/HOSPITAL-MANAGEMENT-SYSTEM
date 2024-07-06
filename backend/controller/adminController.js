import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Admin from "../model/adminModel.js";

const authAdmin = async (req, res) => {
  try {
    const { email, userPassword } = req.body;
    console.log("Received password:", userPassword);
    const admin = await Admin.findOne({ email });
    console.log("Admin:", admin);
    if (admin) {
      console.log("Admin password hash:", admin.password);

      const verified = bcrypt.compareSync(userPassword, admin.password);
      console.log("Password verified:", verified);
      if (verified) {
        res.status(201).json({
          _id: admin._id,
          email: admin.email,
          isAdmin: admin.isAdmin,
          token: generateToken(admin._id),
        });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error("Error in admin authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { authAdmin };
