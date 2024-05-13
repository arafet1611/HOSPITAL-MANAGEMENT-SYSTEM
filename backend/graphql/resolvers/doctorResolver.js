import Employee from "../../model/employeeModel.js";
import Doctor from "../../model/doctorModel.js";
import Nurse from "../../model/nurseModel.js";
import Technician from "../../model/technicianModel.js";
const DoctorResolver = {
  Query: {
    
    doctors: async () => {
      try {
        return await Doctor.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting doctors", e);
      }
    },
  },
  Mutation: {
    async createDoctor(
      _,
      { employeeID, doctorInput: { Type, categorie, responsabilite } }
    ) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newDoctor = new Doctor({
        employee: employeeID,
        Type: Type,
        categorie: categorie,
        responsabilite: responsabilite,
      });

      const savedDoctor = await newDoctor.save();
      return {
        ...savedDoctor._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editDoctor(
      _,
      { doctorID, doctorInput: { Type, categorie, responsabilite } }
    ) {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctorID,
        {
          Type: Type,
          categorie: categorie,
          responsabilite: responsabilite,
        },
        { new: true }
      );

      if (!updatedDoctor) {
        throw new Error("doctor not found");
      }

      return updatedDoctor;
    },
  },
};
export default DoctorResolver;
