import Employee from "../../model/employeeModel.js";
import Doctor from "../../model/doctorModel.js";
const employeeMedecinResolvers = {
  Query: {
    async employee(_, { ID }) {
      return await Employee.findById(ID);
    },
    async getEmployee(_, { amount }) {
      return await Employee.find().sort({ createdAt: -1 }).limit(amount);
    }, // en peut le iliminer
    getAllEmployee: async () => {
      return await Employee.find();
    },
  },
  Mutation: {
    /*  Employee  */
    async createEmployee(
      _,
      { employeeInput: { firstname, lastname, image, Phone, email } }
    ) {
      const createdemployee = new Employee({
        firstname: firstname,
        lastname: lastname,
        image: image,
        Phone: Phone,
        email: email,
        dateJoining: new Date().toISOString(),
      });
      const res = await createdemployee.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteEmployee(_, { ID }) {
      const employeeDeleted = (await Employee.deleteOne({ _id: ID }))
        .deletedCount;
      return employeeDeleted; // 1 if something was deleted , 0 nothing
    },
    async editEmployee(
      _,
      { ID, employeeInput: { firstname, lastname, img, phone, email } }
    ) {
      const employeeEdited = await Employee.updateOne(
        { _id: ID },
        {
          firstname: firstname,
          lastname: lastname,
          image: img,
          phone: phone,
          email: email,
        }
      );
      return employeeEdited;
    },
    /* Medecin*/
    async createMedecin(
      _,
      { employeeID, medecinInput: { Type, categorie, responsabilite } }
    ) {
      const employee = await Employee.findById(employeeID);
      if (!employee) {
        throw new Error("Employee not found");
      }

      // Créez une nouvelle instance de Medecin
      const newMedecin = new Doctor({
        employee: employeeID,
        Type: Type,
        categorie: categorie,
        responsabilite: responsabilite,
      });

      // Enregistrez le nouveau médecin dans la base de données
      const savedMedecin = await newMedecin.save();
      return {
        ...savedMedecin._doc,
        employee: {
          firstname: employee.firstname,
          lastname: employee.lastname,
        },
      };
    },
    async editMedecin(
      _,
      { medecinID, medecinInput: { Type, categorie, responsabilite } }
    ) {
      const updatedMedecin = await Doctor.findByIdAndUpdate(
        medecinID,
        {
          Type: Type,
          categorie: categorie,
          responsabilite: responsabilite,
        },
        { new: true }
      ); // Pour retourner le document mis à jour

      if (!updatedMedecin) {
        throw new Error("Medecin not found");
      }

      // Retourner le medecin mis à jour
      return updatedMedecin;
    },
  },
};
export default employeeMedecinResolvers;
