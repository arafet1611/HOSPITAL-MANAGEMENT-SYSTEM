import Employee from "../../model/employeeModel.js";
import Doctor from "../../model/doctorModel.js";

const DoctorResolver = {
  Query: {
    doctorsByService: async (_, { ServiceId }) => {
      try {
        const employees = await Employee.find({ service: ServiceId }).select(
          "_id"
        );

        const employeeIds = employees.map((employee) => employee._id);
console.log(employeeIds);
        const doctors = await Doctor.find({
          employee: { $in: employeeIds },
        }).populate("employee");

        return doctors;
      } catch (e) {
        console.error("error getting doctors by service ", e);
        throw new Error("Error getting doctors by service");
      }
    },
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
