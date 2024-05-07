import mongoose from "mongoose";
import SchemaObjectModel from "../model/SchemaObjectModel.js";

const updateNumberOfValues = async (modelName, columnUpdates) => {
  try {
    const DynamicModel = mongoose.model(modelName);
    if (!DynamicModel) {
      throw new Error(`Model "${modelName}" not found`);
    }

    const schema = DynamicModel.schema;
    const paths = schema.paths;

    Object.keys(columnUpdates).forEach((columnName) => {
      if (paths[columnName + "_NumberOfvalue"]) {
        paths[columnName + "_NumberOfvalue"].default =
          columnUpdates[columnName];
      } else {
        throw new Error(`Column "${columnName}" not found in the schema`);
      }
    });

    await DynamicModel.init();
    return { message: "Default NumberOfvalues updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update default NumberOfvalues");
  }
};

const getboardtableSchemabyService = async (req, res) => {
  try {
    const { serviceName } = req.params;

    if (!serviceName) {
      return res.status(400).json({ error: "Service name is required." });
    }
    try {
      const serviceSchemaobj = await SchemaObjectModel.findOne({
        schemaName: serviceName,
      });

      if (!serviceSchemaobj) {
        return res
          .status(404)
          .json({ error: "Schema data not found for the specified service." });
      }

      res.status(200).json({ serviceSchemaobj });
    } catch (error) {
      res.status(500).json({ error: "Failed to get schema data by service." });
      console.error("Error finding schema object:", error);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
    console.error("Error:", error);
  }
};

const createboardtableSchema = async (req, res) => {
  try {
    const { schemaName, columns, service, NumberOfValueslist } = req.body;
    const schemaFields = {};
    schemaFields["service"] = {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: service,
    };
    columns.forEach((column, index) => {
      const { columnName, columnType } = column;

      switch (columnType) {
        case "Date":
          schemaFields[columnName] = {
            type: Date,
            required: true,
          };
          schemaFields[columnName + "_NumberOfvalue"] = {
            type: Number,
            default: NumberOfValueslist[index],
          };
          break;
        case "Text":
          schemaFields[columnName] = {
            type: String,
            required: true,
          };
          schemaFields[columnName + "_NumberOfvalue"] = {
            type: Number,
            default: NumberOfValueslist[index],
          };
          break;
        default:
          throw new Error(`Unsupported column type: ${columnType}`);
      }
    });

    const dynamicSchema = new mongoose.Schema(schemaFields);
    let DynamicModel = null;
    if (!mongoose.connection.models[schemaName]) {
      DynamicModel = mongoose.connection.models[schemaName];
    } else {
      DynamicModel = mongoose.connection.models[schemaName];
    }

    if (DynamicModel) {
      res
        .status(201)
        .json({ message: `Schema "${schemaName}" created successfully` });

      try {
        const schemaObjectEntry = new SchemaObjectModel({
          schemaName: schemaName,
          schemaObject: serviceSchemaobj,
        });

        const savedEntry = await schemaObjectEntry.save();
        console.log(
          `Schema object for ${schemaName} saved successfully to database.`
        );
        return savedEntry;
      } catch (error) {
        console.error(`Error saving schema object to database: ${error}`);
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create schema" });
  }
};
const updateboardtableBydates = async (req, res) => {
  try {
    const { Dates, SeniorList, AssistantList, InterneList } = req.body;
    const { schemaName } = req.params;
    const serviceSchemaobj = await SchemaObjectModel.findOne({
      schemaName: schemaName,
    });
    if (!serviceSchemaobj) {
      return res
        .status(404)
        .json({ error: "Schema data not found for the specified service." });
    }

    const schemaConfig = serviceSchemaobj.schemaObject;

    if (schemaConfig.service) {
      schemaConfig.service = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        default: schemaConfig.service.default,
      };
    }

    if (schemaConfig.Date) {
      schemaConfig.Date = {
        type: String,
        default: schemaConfig.Date.default,
      };
    }

    if (schemaConfig.Date_NumberOfvalue) {
      schemaConfig.Date_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Date_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Senior) {
      schemaConfig.Senior = {
        type: String,
        required: true,
      };
    }

    if (schemaConfig.Senior_NumberOfvalue) {
      schemaConfig.Senior_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Senior_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Assistant) {
      schemaConfig.Assistant = {
        type: String,
        required: true,
      };
    }

    if (schemaConfig.Assistant_NumberOfvalue) {
      schemaConfig.Assistant_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Assistant_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Interne) {
      schemaConfig.Interne = {
        type: String,
        required: true,
      };
    }

    if (schemaConfig.Interne_NumberOfvalue) {
      schemaConfig.Interne_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Interne_NumberOfvalue.default,
      };
    }

    let ObjectModel = null;
    if (mongoose.connection.models[schemaName]) {
      ObjectModel = mongoose.connection.models[schemaName];
    } else {
      return res.status(404).json({ error: "Schema model not found." });
    }
    let oldData;
    try {
      oldData = await ObjectModel.find();
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch old data." });
    }

    if (!oldData || oldData.length === 0) {
      return res.status(404).json({ error: "No existing data found." });
    }
    let HistoryModel = null;
    const HistorySchema = new mongoose.Schema({
      fieldName: {
        type: String,
        required: true,
      },
      date: {
        type: String,
      },
      oldValue: {
        type: String,
        required: true,
      },
      newValue: {
        type: String,
        required: true,
      },
      dateOfChange: {
        type: Date,
        default: Date.now,
      },
    });
    if (!mongoose.connection.models[schemaName + "_history"]) {
      HistoryModel = mongoose.model(schemaName + "_history", HistorySchema);
    } else {
      HistoryModel = mongoose.connection.models[schemaName + "_history"];
    }
    if (HistoryModel) {
      console.log(`Schema "${schemaName}"_history created successfully`);
    }

    const savedHistoryData = [];
    Dates.forEach((date, index) => {
      const oldDataForDate = oldData.find((data) => data.Date === date);
      const seniorHasChanges =
        oldDataForDate && oldDataForDate.Senior !== SeniorList[index];

      if (seniorHasChanges) {
        const newHistoryData = new HistoryModel({
          fieldName: "Senior",
          date: oldDataForDate.Date,
          oldValue: oldDataForDate.Senior,
          newValue: SeniorList[index],
        });
        savedHistoryData.push(newHistoryData.save());
      }

      // Check for changes in Assistant field
      const assistantHasChanges =
        oldDataForDate && oldDataForDate.Assistant !== AssistantList[index];

      if (assistantHasChanges) {
        const newHistoryData = new HistoryModel({
          fieldName: "Assistant",
          date: oldDataForDate.Date,
          oldValue: oldDataForDate.Assistant,
          newValue: AssistantList[index],
        });

        savedHistoryData.push(newHistoryData.save());
      }

      // Check for changes in Interne field
      const interneHasChanges =
        oldDataForDate && oldDataForDate.Interne !== InterneList[index];

      if (interneHasChanges) {
        const newHistoryData = new HistoryModel({
          fieldName: "Interne",
          date: oldDataForDate.Date,
          oldValue: oldDataForDate.Interne,
          newValue: InterneList[index],
        });

        savedHistoryData.push(newHistoryData.save());
      }
    });
    const updatedData = Dates.map(async (date, index) => {
      const filter = { Date: date };
      const update = {
        Senior: SeniorList[index],
        Assistant: AssistantList[index],
        Interne: InterneList[index],
      };
      const options = { new: true, upsert: true };
      return ObjectModel.findOneAndUpdate(filter, update, options);
    });
    await Promise.all(savedHistoryData);
    const updatedResults = await Promise.all(updatedData);
    if (updatedResults.some((result) => result)) {
      res
        .status(200)
        .json({ message: "Data updated successfully and updatedSaved" });
    } else {
      res.status(404).json({ error: "No documents were updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createboardtable = async (req, res) => {
  try {
    const { schemaName, Dates, SeniorList, AssistantList, InterneList } =
      req.body;

    const serviceSchemaobj = await SchemaObjectModel.findOne({
      schemaName: schemaName,
    });

    if (!serviceSchemaobj) {
      return res
        .status(404)
        .json({ error: "Schema data not found for the specified service." });
    }

    const schemaConfig = serviceSchemaobj.schemaObject;
    schemaConfig.service = {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: schemaConfig.service.default,
    };
    schemaConfig.Date = {
      type: String,
      default: schemaConfig.Date.default,
    };
    schemaConfig.Date_NumberOfvalue = {
      type: Number,
      default: schemaConfig.Date_NumberOfvalue.default,
    };

    schemaConfig.Senior = {
      type: String,
      required: true,
    };
    schemaConfig.Senior_NumberOfvalue = {
      type: Number,
      default: schemaConfig.Senior_NumberOfvalue.default,
    };
    schemaConfig.Assistant = {
      type: String,
      required: true,
    };
    schemaConfig.Assistant_NumberOfvalue = {
      type: Number,
      default: schemaConfig.Assistant_NumberOfvalue.default,
    };
    schemaConfig.Interne = { type: String, required: true };
    schemaConfig.Interne_NumberOfvalue = {
      type: Number,
      default: schemaConfig.Interne_NumberOfvalue.default,
    };

    let ObjectModel = null;
    if (!mongoose.connection.models[schemaName]) {
      ObjectModel = mongoose.model(schemaName, schemaConfig);
    } else {
      ObjectModel = mongoose.connection.models[schemaName];
    }
    const savedData = [];
    Dates.forEach((date, index) => {
      const newData = new ObjectModel({
        Date: date,
        Senior: SeniorList[index] || "",
        Assistant: AssistantList[index] || "",
        Interne: InterneList[index] || "",
      });

      savedData.push(newData.save());
    });

    const savedResults = await Promise.all(savedData);

    res.status(201).json(savedResults);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create board table schema.",
      details: error.message,
    });
    console.error("Error:", error);
  }
};

const getBoardTableByDate = async (req, res) => {
  try {
    const { schemaName } = req.params;
    const { Dates } = req.query;
    const jsonDate = JSON.parse(Dates);
    const serviceSchemaobj = await SchemaObjectModel.findOne({
      schemaName: schemaName,
    });

    if (!serviceSchemaobj) {
      return res
        .status(404)
        .json({ error: "Schema data not found for the specified service." });
    }

    const schemaConfig = serviceSchemaobj.schemaObject;

    if (schemaConfig.service) {
      schemaConfig.service = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        default: schemaConfig.service.default,
      };
    }

    if (schemaConfig.Date) {
      schemaConfig.Date = {
        type: String,
        default: schemaConfig.Date.default,
      };
    }

    if (schemaConfig.Date_NumberOfvalue) {
      schemaConfig.Date_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Date_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Senior) {
      schemaConfig.Senior = {
        type: String,
        required: true,
      };
    }

    if (schemaConfig.Senior_NumberOfvalue) {
      schemaConfig.Senior_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Senior_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Assistant) {
      schemaConfig.Assistant = {
        type: String,
        required: true,
      };
    }

    if (schemaConfig.Assistant_NumberOfvalue) {
      schemaConfig.Assistant_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Assistant_NumberOfvalue.default,
      };
    }

    if (schemaConfig.Interne) {
      schemaConfig.Interne = { type: String, required: true };
    }

    if (schemaConfig.Interne_NumberOfvalue) {
      schemaConfig.Interne_NumberOfvalue = {
        type: Number,
        default: schemaConfig.Interne_NumberOfvalue.default,
      };
    }
    let ObjectModel = null;
    if (!mongoose.connection.models[schemaName]) {
      ObjectModel = mongoose.model(schemaName, schemaConfig);
    } else {
      ObjectModel = mongoose.connection.models[schemaName];
    }
    const ObjectModelData = await ObjectModel.find({ Date: { $in: jsonDate } });

    res.status(200).json(ObjectModelData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBoardHistoryTableByDate = async (req, res) => {
  try {
    const { schemaName } = req.params;
    const { Dates } = req.query;
    const datesArray = JSON.parse(Dates);

    const HistorySchemaName = schemaName.toLowerCase() + "_history";

    let HistoryModel = null;
    const HistorySchema = new mongoose.Schema({
      fieldName: {
        type: String,
        required: true,
      },
      date: {
        type: String,
      },
      oldValue: {
        type: String,
        required: true,
      },
      newValue: {
        type: String,
        required: true,
      },
      dateOfChange: {
        type: Date,
        default: Date.now,
      },
    });
    if (!mongoose.connection.models[HistorySchemaName]) {
      HistoryModel = mongoose.model(HistorySchemaName, HistorySchema);
    } else {
      HistoryModel = mongoose.connection.models[HistorySchemaName];
    }

    const historyData = [];

    const HistoryModelDatas = await HistoryModel.find();
    for (const date of datesArray) {
      for (const data of HistoryModelDatas) {
        if (data.date === date) {
          historyData.push(data);
        }
      }
    }

    res.status(200).json(historyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createboardtableSchema,
  createboardtable,
  updateNumberOfValues,
  updateboardtableBydates,
  getboardtableSchemabyService,
  getBoardTableByDate,
  getBoardHistoryTableByDate,
};
