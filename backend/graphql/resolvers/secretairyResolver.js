import Employee from "../../model/employeeModel.js";
import Secretairy from "../../model/secretairyModel.js";
import Service from "../../model/serviceModel.js";

const secretairyResolver = {
  Query: {
    secretairys: async () => {
      try {
        return await Secretairy.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting technicians", e);
      }
    },
  },
  Mutation: {
    async createSecretairy(
      _,
      { serviceID, employeeID, secretairyInput: { responsabilite } }
    ) {
      const service = await Service.findById(serviceID);
      if (!service) {
        throw new Error("Service not found");
      }

      const existingSecretairy = await Secretairy.findOne({
        service: serviceID,
      });
      if (existingSecretairy) {
        throw new Error("A secretary already exists in this service");
      }

      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newSecretairy = new Secretairy({
        employee: employeeID,
        responsabilite: responsabilite,
      });
      const savedSecretairy = await newSecretairy.save();
      return {
        ...savedSecretairy._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editSecretairy(
      _,
      { secretairyID, secretairyInput: { responsabilite } }
    ) {
      const updatedSecretairy = await Secretairy.findByIdAndUpdate(
        secretairyID,
        {
          responsabilite: responsabilite,
        },
        { new: true }
      );
      if (!updatedSecretairy) {
        throw new Error("secretairy  not found");
      }
      return updatedSecretairy;
    },
  },
};
export default secretairyResolver;
