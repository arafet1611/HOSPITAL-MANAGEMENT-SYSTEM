import Employee from "../model/employeeModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "opal.mohr53@ethereal.email",
    pass: "WyKBQZmjf8F2H74r5X",
  },
});
function generateRandomPassword(length = 8) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
async function sendEmail(toEmail, subject, text) {
  try {
    await transporter.sendMail({
      from: "opal.mohr53@ethereal.email",
      to: toEmail,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully to " + toEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
const resendPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const employee = await Employee.findOne({ email });
    const updatedUser = await Employee.findOneAndUpdate(
      { email },
      { hashPassword: hashedPassword },
      { new: true }
    );
    if (updatedUser) {
      await sendEmail(
        email,
        "Votre  nouveau mot de passe",
        `Bonjour M./MS. ${employee.firstname} ${employee.lastname}\nVotre mot de passe sur HôpitalTaharSfar.tn a été re-initialisé, le mot de passe est : \nmot de passe : ${newPassword}`
      );

      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error resending password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const authEmployee = async (req, res) => {
  try {
    const { email, userPassword } = req.body;
    console.log(userPassword);
    const user = await Employee.findOne({ email });
    console.log(user);
    if (user) {
      const { password } = user;
      const verified = bcrypt.compareSync(userPassword, password);
      console.log(verified);
      if (verified) {
        res.status(201).json({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
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

export { authEmployee, resendPassword };
