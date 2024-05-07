import Employee from "../../model/employeeModel.js";
import Nurse from "../../model/nurseModel.js";
const NurseResolver = {
  Query: {
    nurses: async () => {
      try {
        return await Nurse.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting nurses", e);
      }
    },
  },
  Mutation: {
    async createNurse(
      _,
      { employeeID, nurseInput: { Type, categorie, responsabilite } }
    ) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newNurse = new Nurse({
        employee: employeeID,
        Type: Type,
        categorie: categorie,
        responsabilite: responsabilite,
      });

      const savedNurse = await newNurse.save();
      return {
        ...savedNurse._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editNurse(
      _,
      { nurseID, nurseInput: { Type, categorie, responsabilite } }
    ) {
      const updatedNurse = await Nurse.findByIdAndUpdate(
        nurseID,
        {
          Type: Type,
          categorie: categorie,
          responsabilite: responsabilite,
        },
        { new: true }
      );

      if (!updatedNurse) {
        throw new Error("Nurse  not found");
      }

      return updatedNurse;
    },
  },
};
export default NurseResolver;
