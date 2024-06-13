import EmployeePrime from "../model/employeePrimeModel.js";
import Prime from "../model/primeModel.js";
import Doctor from "../model/doctorModel.js";
const createPrimeByServiceAndPrime = async (req, res) => {
  const { services, workingYear } = req.body;
  try {
    const existingPrime = await Prime.findOne({
      workingYear: workingYear,
    });
    if (!existingPrime) {
      const savedPrimes = await Promise.all(
        services.map(async (service) => {
          const newPrime = new Prime({
            service: service._id,
            workingYear: workingYear,
          });
          return newPrime.save();
        })
      );

      res.status(201).json(savedPrimes);
    } else {
      res.status(409).json({ message: "Prime for that year already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdatePrimeByServiceAndPrime = async (req, res) => {
  try {
    const { rowsData } = req.body;
    const { workingYear } = req.params;
    console.log("rowsData", rowsData);
    console.log("workingYear", workingYear);
    const savedPrimes = await Promise.all(
      rowsData.map(async (data) => {
        return await Prime.findOneAndUpdate(
          { _id: data._id },
          {
            residentWorkingOnWeekendBonus: data.residentWorkingOnWeekendBonus,
            residentWorkingOnHolidaysBonus: data.residentWorkingOnHolidaysBonus,
            residentWorkingOnRegularDaysBonus:
              data.residentWorkingOnRegularDaysBonus,
            assistantWorkingOnWeekendBonus: data.assistantWorkingOnWeekendBonus,
            assistantWorkingOnHolidaysBonus:
              data.assistantWorkingOnHolidaysBonus,
            assistantWorkingOnRegularDaysBonus:
              data.assistantWorkingOnRegularDaysBonus,
            seniorWorkingOnWeekendBonus: data.seniorWorkingOnWeekendBonus,
            seniorWorkingOnHolidaysBonus: data.seniorWorkingOnHolidaysBonus,
            seniorWorkingOnRegularDaysBonus:
              data.seniorWorkingOnRegularDaysBonus,
          },
          { new: true }
        );
      })
    );
    console.log("saved data", savedPrimes);
    res.status(200).json(savedPrimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPrimeByYear = async (req, res) => {
  try {
    const workingYear = req.params.WorkingYear;
    console.log("working", workingYear);
    const prime = await Prime.find({
      workingYear: workingYear,
    }).populate("service");

    if (!prime) {
      return res.status(404).json({ message: "Prime not found" });
    }

    res.status(200).json(prime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculEmployeePrimeByServiceAndYear = async (req, res) => {
  try {
    const {
      service,
      employee,
      workingYear,
      nbOfDaysResidentWorkingOnWeekend,
      nbOfDaysResidentWorkingOnHolidays,
      nbOfDaysResidentWorkingOnRegularDays,
      nbOfDaysAssistantWorkingOnWeekend,
      nbOfDaysAssistantWorkingOnHolidays,
      nbOfDaysAssistantWorkingOnRegularDays,
      nbOfDaysSeniorWorkingOnWeekend,
      nbOfDaysSeniorWorkingOnHolidays,
      nbOfDaysSeniorWorkingOnRegularDays,
    } = req.body;
    console.log(employee);
    const prime = await Prime.findOne({
      service: service,
      workingYear: workingYear,
    });

    if (!prime) {
      return res.status(404).json({ message: "Prime not found" });
    }

    let bonusTotal = 0;
    switch (employee.Type) {
      case "senior":
        bonusTotal =
          prime.seniorWorkingOnWeekendBonus * nbOfDaysSeniorWorkingOnWeekend +
          prime.seniorWorkingOnHolidaysBonus * nbOfDaysSeniorWorkingOnHolidays +
          prime.seniorWorkingOnRegularDaysBonus *
            nbOfDaysSeniorWorkingOnRegularDays;
        break;
      case "assistant":
        bonusTotal =
          prime.assistantWorkingOnWeekendBonus *
            nbOfDaysAssistantWorkingOnWeekend +
          prime.assistantWorkingOnHolidaysBonus *
            nbOfDaysAssistantWorkingOnHolidays +
          prime.assistantWorkingOnRegularDaysBonus *
            nbOfDaysAssistantWorkingOnRegularDays;
        break;
      case "interne":
        bonusTotal =
          prime.residentWorkingOnWeekendBonus *
            nbOfDaysResidentWorkingOnWeekend +
          prime.residentWorkingOnHolidaysBonus *
            nbOfDaysResidentWorkingOnHolidays +
          prime.residentWorkingOnRegularDaysBonus *
            nbOfDaysResidentWorkingOnRegularDays;
        break;
      default:
        return res.status(400).json({ message: "Invalid employee role" });
    }

    const existingEmployeePrime = await EmployeePrime.findOne({
      service: service,
      employee: employee.employee.id,
      workingYear: workingYear,
    });
    console.log(existingEmployeePrime);
    if (existingEmployeePrime) {
      existingEmployeePrime.nbOfDaysResidentWorkingOnWeekend =
        nbOfDaysResidentWorkingOnWeekend;
      existingEmployeePrime.nbOfDaysResidentWorkingOnHolidays =
        nbOfDaysResidentWorkingOnHolidays;
      existingEmployeePrime.nbOfDaysResidentWorkingOnRegularDays =
        nbOfDaysResidentWorkingOnRegularDays;
      existingEmployeePrime.nbOfDaysAssistantWorkingOnWeekend =
        nbOfDaysAssistantWorkingOnWeekend;
      existingEmployeePrime.nbOfDaysAssistantWorkingOnHolidays =
        nbOfDaysAssistantWorkingOnHolidays;
      existingEmployeePrime.nbOfDaysAssistantWorkingOnRegularDays =
        nbOfDaysAssistantWorkingOnRegularDays;
      existingEmployeePrime.nbOfDaysSeniorWorkingOnWeekend =
        nbOfDaysSeniorWorkingOnWeekend;
      existingEmployeePrime.nbOfDaysSeniorWorkingOnHolidays =
        nbOfDaysSeniorWorkingOnHolidays;
      existingEmployeePrime.nbOfDaysSeniorWorkingOnRegularDays =
        nbOfDaysSeniorWorkingOnRegularDays;
      existingEmployeePrime.bonusTotal = bonusTotal;

      const updatedEmployeePrime = await existingEmployeePrime.save();
      console.log("updatedEmployeePrime", updatedEmployeePrime);
      return res.status(200).json(updatedEmployeePrime);
    } else {
      const employeePrime = new EmployeePrime({
        service: service,
        employee: employee.employee.id,
        workingYear: workingYear,
        nbOfDaysResidentWorkingOnWeekend,
        nbOfDaysResidentWorkingOnHolidays,
        nbOfDaysResidentWorkingOnRegularDays,
        nbOfDaysAssistantWorkingOnWeekend,
        nbOfDaysAssistantWorkingOnHolidays,
        nbOfDaysAssistantWorkingOnRegularDays,
        nbOfDaysSeniorWorkingOnWeekend,
        nbOfDaysSeniorWorkingOnHolidays,
        nbOfDaysSeniorWorkingOnRegularDays,
        bonusTotal,
      });

      const savedEmployeePrime = await employeePrime.save();
      console.log("console.log", savedEmployeePrime);
      return res.status(200).json(savedEmployeePrime);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllEmployeePrime = async (req, res) => {
  const { serviceId } = req.params;
  const { year } = req.query;
  try {
    const existingEmployeePrimes = await EmployeePrime.find({
      service: serviceId,
      workingYear: year,
    })
      .populate("service")
      .populate("employee");

    if (existingEmployeePrimes.length === 0) {
      return res.status(404).json({
        message:
          "No EmployeePrime records found for the specified service and year.",
      });
    }

    res.status(200).json(existingEmployeePrimes);
  } catch (error) {
    console.error("Error fetching EmployeePrime records:", error);
    res.status(500).json({
      message: "An error occurred while fetching EmployeePrime records.",
    });
  }
};
const getAllPrimeByServiceAndYear = async (req, res) => {
  try {
    const { serviceId, workingYear } = req.params;

    const primes = await Prime.find({
      service: serviceId,
      workingYear,
    }).populate("employee");

    if (!primes || primes.length === 0) {
      return res
        .status(404)
        .json({ message: "No primes found for the given service and year" });
    }

    res.status(200).json(primes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPrimeByServiceAndPrime,
  UpdatePrimeByServiceAndPrime,
  getPrimeByYear,
  getAllEmployeePrime,
  calculEmployeePrimeByServiceAndYear,
  getAllPrimeByServiceAndYear,
};
