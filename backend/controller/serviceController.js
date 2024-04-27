import Service from "../model/serviceModel.js";

const createService = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newService = new Service({
      title,
      content,
      category,
    });

    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
      },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
};
