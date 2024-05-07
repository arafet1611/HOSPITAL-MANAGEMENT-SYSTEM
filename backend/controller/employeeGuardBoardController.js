import EmployeeGuardBoard from "../model/employeeGuardBoardModel.js";
import Employee from "../model/employeeModel.js";
export const upsertGuardingDates = async (req, res) => {
  try {
    const { AssistantList, SeniorList, InterneList, serviceId, month, method } =
      req.body;

    if (method === "PUT") {
      const handleList = async (list) => {
        let updatedEmployeeGuardBoardList = [];
        for (const employee of list) {
          const [firstName, ...lastNameParts] = employee.name.split(" ");
          const lastName = lastNameParts.join(" ");
          const employeeObject = await Employee.findOne({
            firstName,
            lastName,
          });
          if (!employeeObject) continue;

          const updatedEmployeeGuardBoard =
            await EmployeeGuardBoard.findOneAndUpdate(
              { employee: employeeObject._id },
              { $set: { guardingDates: employee.guardingDates } },
              { new: true }
            );

          if (updatedEmployeeGuardBoard) {
            updatedEmployeeGuardBoardList.push(updatedEmployeeGuardBoard);
          }
        }
        return updatedEmployeeGuardBoardList;
      };

      const updatedEmployeeGuardBoardAssitantList = await handleList(
        AssistantList
      );
      const updatedEmployeeGuardBoardSeniorList = await handleList(SeniorList);
      const updatedEmployeeGuardBoardInterneList = await handleList(
        InterneList
      );

      const updatedResults = [
        ...updatedEmployeeGuardBoardAssitantList,
        ...updatedEmployeeGuardBoardSeniorList,
        ...updatedEmployeeGuardBoardInterneList,
      ];

      res.json(updatedResults);
    } else if (method === "POST") {
      const handleCreateList = async (list) => {
        let employeeGuardBoardList = [];
        for (const employee of list) {
          const [firstName, ...lastNameParts] = employee.name.split(" ");
          const lastName = lastNameParts.join(" ");
          const employeeObjectList = await Employee.find();
          let employeeId;
          for (const employee of employeeObjectList) {
            if (
              employee.firstname === firstName &&
              employee.lastname === lastName
            ) {
              employeeId = employee._id;
            }
          }
          if (!employeeId) continue;
          const newEmployeeGuardBoard = new EmployeeGuardBoard({
            employee: employeeId,
            service: serviceId,
            guardingMonth: month,
            guardingDates: employee.guardingDates,
          });

          const employeeGuardBoard = await newEmployeeGuardBoard.save();
          if (employeeGuardBoard) {
            employeeGuardBoardList.push(employeeGuardBoard);
          }
        }
        return employeeGuardBoardList;
      };

      const employeeGuardBoardAssitantList = await handleCreateList(
        AssistantList
      );
      const employeeGuardBoardSeniorList = await handleCreateList(SeniorList);
      const employeeGuardBoardInterneList = await handleCreateList(InterneList);

      const Results = [
        ...employeeGuardBoardAssitantList,
        ...employeeGuardBoardSeniorList,
        ...employeeGuardBoardInterneList,
      ];

      res.json(Results);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const isServiceAndMonthSaved = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { month } = req.query;
    console.log("serviceid", serviceId, "month", month);
    let lastChangeDate;
    const existingRecords = await EmployeeGuardBoard.find();
    console.log("existingRecords", existingRecords);

    for (const element of existingRecords) {
      if (
        element.service.toString() === serviceId &&
        element.guardingMonth === month
      ) {
        lastChangeDate = element.lastChangeDate;
        console.log(lastChangeDate);
        break;
      }
    }

    console.log("Last Change Date:", lastChangeDate);

    if (lastChangeDate !== null) {
      res.status(201).json(lastChangeDate);
    } else {
      res
        .status(404)
        .json({ message: "Service and month combination not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getGuardingDatesByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { todayDate } = req.query;

    const today = new Date(todayDate);

    const guardBoardEntry = await EmployeeGuardBoard.findOne({
      employee: employeeId,
    });

    if (
      !guardBoardEntry ||
      !guardBoardEntry.guardingDates ||
      guardBoardEntry.guardingDates.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "Guarding dates not found for this employee." });
    }

    const upcomingGuardingDates = guardBoardEntry.guardingDates.filter(
      (date) => {
        const [day, month, year] = date.split("/");
        const guardingDate = new Date(`${day}/${month}/${year}`);
        return guardingDate >= today;
      }
    );

    res.json(upcomingGuardingDates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
