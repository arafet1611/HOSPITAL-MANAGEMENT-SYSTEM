import EmployeeGuardBoard from "../model/employeeGuardBoardModel.js";
import Employee from "../model/employeeModel.js";

export const upsertGuardingDates = async (req, res) => {
  try {
    const { AssistantList, SeniorList, InterneList, serviceId, month, method } =
      req.body;
    console.log(method);
    let updatedResults = [];

    const handleCreateList = async (list) => {
      let employeeGuardBoardList = [];
      for (const employee of list) {
        const [firstName, ...lastNameParts] = employee.name.split(" ");
        const lastName = lastNameParts.join(" ");
        console.log("first name ", firstName, "lastname", lastName);
        const employees = await Employee.find();
        let exactMatch = employees.find((employee) => {
          return (
            employee.firstname === firstName && employee.lastname === lastName
          );
        });
        console.log(exactMatch);
        if (!exactMatch) continue;

        // Delete old records with the same guardingMonth
        await EmployeeGuardBoard.deleteMany({
          employee: exactMatch._id,
          guardingMonth: month,
        });

        const newEmployeeGuardBoard = new EmployeeGuardBoard({
          employee: exactMatch._id,
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

    if (method === "PUT" || method === "POST") {
      const employeeGuardBoardAssitantList = await handleCreateList(
        AssistantList
      );
      const employeeGuardBoardSeniorList = await handleCreateList(SeniorList);
      const employeeGuardBoardInterneList = await handleCreateList(InterneList);

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
export const getAllGuardingDatesByEmployeeIdAndMonth = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { month } = req.query;
    console.log("month", month);
    if (!employeeId || !month) {
      return res
        .status(400)
        .json({ message: "Employee ID and month are required." });
    }
    console.log(employeeId, month);

    const guardBoardEntries = await EmployeeGuardBoard.find({
      employee: employeeId,
      guardingMonth: month,
    });
    console.log(guardBoardEntries);
    const matchingGuardingDates = [];
    guardBoardEntries.forEach((entry) => {
      entry.guardingDates.forEach((date) => {
        const [day, monthString, yearString] = date.split("/");
        const monthYearString = `${monthString}/${yearString}`;
        console.log("monthYearString", monthYearString);
        if (monthYearString === month) {
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

    const [day, month, year] = todayDate.split("/");
    const today = new Date(`${year}-${month}-${day}`);
    console.log(employeeId, today);

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
        const guardingDate = new Date(`${year}-${month}-${day}`);
        return guardingDate >= today;
      }
    );

    res.json(upcomingGuardingDates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
