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
    console.log(DynamicModel);
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
    console.log(serviceName);
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
      console.log("Service schema:", serviceSchemaobj);
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
    console.log(dynamicSchema);
    const DynamicModel = mongoose.model(schemaName, dynamicSchema);

    const HistoryModel = mongoose.model(schemaName + "_history", dynamicSchema);
    const serviceSchemaobj = DynamicModel.schema.obj;

    if (HistoryModel) {
      console.log(`Schema "${schemaName}"_history created successfully`);
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
    console.log(schemaName);
    const serviceSchemaobj = await SchemaObjectModel.findOne({
      schemaName: schemaName,
    });
    console.log(serviceSchemaobj);
    if (!serviceSchemaobj) {
      return res
        .status(404)
        .json({ error: "Schema data not found for the specified service." });
    }

    const schemaConfig = serviceSchemaobj.schemaObject;
    console.log(schemaConfig);

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

    const ObjectModel = mongoose.model(schemaName, schemaConfig);
    const oldData = await ObjectModel.find();

    const HistoryModel = mongoose.model(schemaName + "_history", schemaConfig);

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

    // Wait for all document updates to complete
    const updatedResults = await Promise.all(updatedData);
    await HistoryModel.create({ schemaName, oldData });

    // Check if any documents were updated
    if (updatedResults.some((result) => result)) {
      res.status(200).json({ message: "Data updated successfully" });
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
    console.log(schemaConfig);
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

    const ObjectModel = mongoose.model(schemaName, schemaConfig);

    const savedData = [];
    Dates.forEach((date, index) => {
      const newData = new ObjectModel({
        Date: date,
        Senior: SeniorList[index],
        Assistant: AssistantList[index],
        Interne: InterneList[index],
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

const getBoardTable = async (req, res) => {
  try {
    const { schemaName } = req.params;

    const serviceSchemaobj = await SchemaObjectModel.findOne({
      schemaName: schemaName,
    });

    if (!serviceSchemaobj) {
      return res
        .status(404)
        .json({ error: "Schema data not found for the specified service." });
    }

    const schemaConfig = { ...serviceSchemaobj.schemaObject };

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

    const schema = new mongoose.Schema(schemaConfig);

    const ObjectModel = mongoose.model(schemaName, schema);

    const ObjectModelData = await ObjectModel.find();

    res.status(200).json(ObjectModelData);
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
  getBoardTable,
};
