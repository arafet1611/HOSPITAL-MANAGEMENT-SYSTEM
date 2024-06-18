import Employee from "../model/employeeModel.js";
import Doctor from "../model/doctorModel.js";
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
const getDoctorByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const employeeData = await Doctor.findOne({
      employee: employeeId,
    }).populate({
      path: "employee",
      populate: { path: "service" },
    });
    if (!employeeData) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ employeeData });
  } catch (error) {
    console.error("Error fetching Employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const { _id, job } = req.user;

    let employeeData;

    if (job === "doctor") {
      employeeData = await Doctor.findOne({ employee: _id }).populate({
        path: "employee",
        populate: { path: "service" },
      });
    } else if (job === "nurse") {
      employeeData = await Nurse.findOne({ employee: _id }).populate(
        "employee"
      );
    } else if (job === "human resource") {
      employeeData = await HumanResource.findOne({ employee: _id }).populate(
        "employee"
      );
    }

    if (!employeeData) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ employeeData });
  } catch (error) {
    console.error("Error fetching Employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployeeImage = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { filename } = req.file;

    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const result = await Employee.findByIdAndUpdate(employeeId, {
      image: filename,
    });

    if (result) {
      return res
        .status(200)
        .json({ message: "Employee image updated successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update employee image" });
    }
  } catch (error) {
    console.error("Error updating employee image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const resendPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const employee = await Employee.findOne({ email });
    console.log(hashedPassword);
    const updatedUser = await Employee.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
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
    console.log("Received password:", userPassword);
    const user = await Employee.findOne({ email });
    console.log("User:", user);
    if (user) {
      console.log("User password hash:", user.password);

      const verified = bcrypt.compareSync(userPassword, user.password);
      console.log("Password verified:", verified);
      if (verified) {
        res.status(201).json({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          sex: user.sex,
          job: user.job,
          service: user.service,
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
export {
  authEmployee,
  updateEmployeeImage,
  resendPassword,
  getEmployeeById,
  getDoctorByEmployee,
};
