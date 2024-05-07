import Employee from "../../model/employeeModel.js";
import Technician from "../../model/technicianModel.js";

const TechnicianResolver = {
  Query: {
    technicians: async () => {
      try {
        return await Technician.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting technicians", e);
      }
    },
  },
  Mutation: {
    async createTechnician(
      _,
      { employeeID, technicianInput: { Type, categorie, responsabilite } }
    ) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newTechnician = new Technician({
        employee: employeeID,
        Type: Type,
        categorie: categorie,
        responsabilite: responsabilite,
      });

      const savedTechnician = await newTechnician.save();
      return {
        ...savedTechnician._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editTechnician(
      _,
      { technicianID, technicianInput: { Type, categorie, responsabilite } }
    ) {
      const updatedTechnician = await Technician.findByIdAndUpdate(
        technicianID,
        {
          Type: Type,
          categorie: categorie,
          responsabilite: responsabilite,
        },
        { new: true }
      );
      if (!updatedTechnician) {
        throw new Error("Technician  not found");
      }
      return updatedTechnician;
    },
  },
};
export default TechnicianResolver;
