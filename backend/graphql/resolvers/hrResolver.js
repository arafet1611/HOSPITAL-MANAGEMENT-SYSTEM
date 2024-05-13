import Employee from "../../model/employeeModel.js";
import Hr from "../../model/hrModel.js";
const HrResolver = {
  Query: {
    hrs: async () => {
      try {
        return await Hr.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting nurses", e);
      }
    },
  },
  Mutation: {
    async createHr(_, { employeeID, hrInput: { responsabilite } }) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newHr = new Hr({
        employee: employeeID,
        responsabilite: responsabilite,
      });

      const savedHr = await newHr.save();
      return {
        ...savedHr._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editHr(_, { hrID, hrInput: { responsabilite } }) {
      const updatedHr = await Hr.findByIdAndUpdate(
        hrID,
        {
          responsabilite: responsabilite,
        },
        { new: true }
      );

      if (!updatedHr) {
        throw new Error("Nurse  not found");
      }

      return updatedHr;
    },
  },
};
export default HrResolver;
