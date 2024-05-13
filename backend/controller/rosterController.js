import Service from "../model/serviceModel.js";
import Roster from "../model/rosterModel.js";

const createRoster = async (req, res) => {
  try {
    // Vérifier si un roster existe déjà pour ce service
    const existingRoster = await Roster.findOne({ service: req.body.service });
    if (existingRoster) {
      return res
        .status(400)
        .json({ message: "A roster already exists for this service" });
    }

    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Create the roster
    const newRoster = new Roster({
      service: req.body.service,
      date: date,
      employees: {
        doctors: req.body.doctors.map((doctor) => ({
          firstname: doctor.firstname,
          lastname: doctor.lastname,
          title: doctor.title,
        })),
        nurses: req.body.nurses.map((nurse) => ({
          firstname: nurse.firstname,
          lastname: nurse.lastname,
          title: nurse.title,
        })),
        technicians: req.body.technicians.map((technician) => ({
          firstname: technician.firstname,
          lastname: technician.lastname,
          title: technician.title,
        })),
        workers: req.body.workers.map((worker) => ({
          firstname: worker.firstname,
          lastname: worker.lastname,
          title: worker.title,
        })),
      },
    });

    await newRoster.save();
    res.status(201).json(newRoster);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating roster" });
  }
};

const getAllRosters = async (req, res) => {
  try {
    const rosters = await Roster.find();
    res.json(rosters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getRostersByDateAndService = async (req, res) => {
  try {
    const { date, service } = req.body;
    const parsedDate = new Date(date);

    if (!parsedDate || isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please provide a valid date." });
    }

    const rosters = await Roster.find({
      date: parsedDate,
      service: service,
    });

    if (!rosters || rosters.length === 0) {
      return res
        .status(404)
        .json({ message: "No rosters found for this date and service" });
    }

    res.json(rosters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching rosters" });
  }
};

export { createRoster, getAllRosters, getRostersByDateAndService };
