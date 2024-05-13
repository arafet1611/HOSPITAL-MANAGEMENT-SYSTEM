import Employee from "../../model/employeeModel.js";
import bcrypt from "bcrypt";
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
const EmployeeResolver = {
  Query: {
    async employee(_, { ID }) {
      try {
        return await Employee.findById(ID);
      } catch (e) {
        console.error("erreur getting employees", e);
      }
    },

    employees: async () => {
      try {
        return await Employee.find({}).populate("service");
      } catch (e) {
        console.error("erreur getting employee", e);
      }
    },
  },
  Mutation: {
    async createEmployee(
      _,
      {
        employeeInput: { firstname, lastname, phone, email, sex, job,service },
      }
    ) {
      const randomPassword = generateRandomPassword(); // You need to define this function
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const createdemployee = new Employee({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        sex: sex,
        job: job,
        service: service,
        password: hashedPassword,
        dateJoining: new Date().toISOString(),
      });

      const res = await createdemployee.save();
      if (res) {
        sendEmail(
          email,
          "Votre mot de passe",
          `Bonjour M./MS. ${firstname} ${lastname}\nVotre mot de passe sur HôpitalTaharSfar.tn a été initialisé, le mot de passe est : \nmot de passe : ${randomPassword}`
        );
      }

      return {
        id: res.id,
        ...res._doc,
      };
    },
    /*uploadImage:async (parent ,{filename} ) => {
            const path  = require('path')
            const mainDir = path.dirname(require.main.filename);
          
            filename = `${mainDir}/uploads/${filename}`;
            
             if (!fs.existsSync(filename)) {
             throw new Error(`File not found: ${filename}`);
            }
            try{
                const photo = await cloudinary.v2.uploader.upload(filename)
                console.log(photo)
                console.log(path)
                return photo.secure_url;
            }catch(err){
               
                throw new Error(err) 
            }
        },*/
    async deleteEmployee(_, { ID }) {
      console.log(ID);
      const employeeDeleted = (await Employee.deleteOne({ _id: ID }))
        .deletedCount;
      return employeeDeleted > 0;
    },
    async editEmployee(
      _,
      {
        ID,
        employeeInput: { firstname, lastname, phone, email, sex, job, service },
      }
    ) {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: ID },
          {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            sex: sex,
            job: job,
            service: service,
          },
          { new: true }
        );
        return updatedEmployee;
      } catch (err) {
        console.error("Erreur updating employee", err);
      }
    },
  },
};
export default EmployeeResolver;
