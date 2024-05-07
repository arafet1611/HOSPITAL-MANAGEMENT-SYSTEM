import Employee from "../../model/employeeModel.js";
import Worker from "../../model/workerModel.js";
const WorkerResolver = {
  Query: {
    workers: async () => {
      try {
        return await Worker.find({}).populate("employee");
      } catch (e) {
        console.error("erreur getting workers", e);
      }
    },
  },
  Mutation: {
    async createWorker(
      _,
      { employeeID, workerInput: { Type, categorie, responsabilite } }
    ) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const newWorker = new Worker({
        employee: employeeID,
        Type: Type,
        categorie: categorie,
        responsabilite: responsabilite,
      });

      const savedWorker = await newWorker.save();
      return {
        ...savedWorker._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editWorker(
      _,
      { workerID, workerInput: { Type, categorie, responsabilite } }
    ) {
      const updatedWorker = await Worker.findByIdAndUpdate(
        workerID,
        {
          Type: Type,
          categorie: categorie,
          responsabilite: responsabilite,
        },
        { new: true }
      );

      if (!updatedWorker) {
        throw new Error("Worker  not found");
      }

      return updatedWorker;
    },
  },
};
export default WorkerResolver;
