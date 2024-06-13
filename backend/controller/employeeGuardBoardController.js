import EmployeeGuardBoard from "../model/employeeGuardBoardModel.js";
import Employee from "../model/employeeModel.js";
import Notification from "../model/NotificationModel.js";
import { initSocketIO } from "../configs/socketHandler.js";

export const upsertGuardingDates = async (req, res) => {
  const user = req.user;
  try {
    const {
      AssistantList,
      SeniorList,
      InterneList,
      serviceId,
      month,
      method,
      userId,
    } = req.body;

    let updatedResults = [];
    if (method === "PUT") {
      const handleList = async (list, role, job) => {
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

        const notification = new Notification({
          serviceId,
          role,
          job,
          message: `Guarding dates updated for ${role} and ${job}`,
        });
        await notification.save();
        const io = initSocketIO();

        io.emit("guardingDatesUpdated", {
          message: `Guarding dates updated for ${role} and ${job}`,
          serviceId,
          role,
          job,
        });

        return updatedEmployeeGuardBoardList;
      };

      const updatedEmployeeGuardBoardAssitantList = await handleList(
        AssistantList,
        "Assistant",
        user.job
      );
      const updatedEmployeeGuardBoardSeniorList = await handleList(
        SeniorList,
        "Senior",
        user.job
      );
      const updatedEmployeeGuardBoardInterneList = await handleList(
        InterneList,
        "Intern",
        user.job
      );

      updatedResults = [
        ...updatedEmployeeGuardBoardAssitantList,
        ...updatedEmployeeGuardBoardSeniorList,
        ...updatedEmployeeGuardBoardInterneList,
      ];
    } else if (method === "POST") {
      const handleCreateList = async (list, role, job) => {
        let employeeGuardBoardList = [];
        for (const employee of list) {
          const [firstName, ...lastNameParts] = employee.name.split(" ");
          const lastName = lastNameParts.join(" ");
          const employeeObject = await Employee.findOne({
            firstName,
            lastName,
          });
          if (!employeeObject) continue;

          const newEmployeeGuardBoard = new EmployeeGuardBoard({
            employee: employeeObject._id,
            service: serviceId,
            guardingMonth: month,
            guardingDates: employee.guardingDates,
          });

          const employeeGuardBoard = await newEmployeeGuardBoard.save();
          if (employeeGuardBoard) {
            employeeGuardBoardList.push(employeeGuardBoard);
          }
        }

        const notification = new Notification({
          serviceId,
          role,
          message: `Guarding dates updated for ${role}`,
        });
        await notification.save();

        io.emit("guardingDatesUpdated", {
          message: `Guarding dates updated for ${role}`,
          serviceId,
          role,
        });

        return employeeGuardBoardList;
      };

      const employeeGuardBoardAssitantList = await handleCreateList(
        AssistantList,
        "Assistant",
        user.job
      );
      const employeeGuardBoardSeniorList = await handleCreateList(
        SeniorList,
        "Senior",
        user.job
      );
      const employeeGuardBoardInterneList = await handleCreateList(
        InterneList,
        "Intern",
        user.job
      );

      updatedResults = [
        ...employeeGuardBoardAssitantList,
        ...employeeGuardBoardSeniorList,
        ...employeeGuardBoardInterneList,
      ];
    }

    res.json(updatedResults);
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
export const getAllGuardingDatesByEmployeeIdAndYear = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { year } = req.query;
    if (!employeeId || !year) {
      return res
        .status(400)
        .json({ message: "Employee ID and year are required." });
    }

    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const guardingMonths = months.map((month) => `${month}/${year}`);

    const guardBoardEntries = await EmployeeGuardBoard.find({
      employee: employeeId,
      guardingMonth: { $in: guardingMonths },
    });

    const matchingGuardingDates = [];
    guardBoardEntries.forEach((entry) => {
      entry.guardingDates.forEach((date) => {
        const [day, month, yearString] = date.split("/");
        if (parseInt(yearString, 10) === parseInt(year, 10)) {
          matchingGuardingDates.push(date);
        }
      });
    });

    if (matchingGuardingDates.length === 0) {
      return res.json([]);
    }
    console.log("matchingGuardingDates " + matchingGuardingDates);

    res.json(matchingGuardingDates);
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
