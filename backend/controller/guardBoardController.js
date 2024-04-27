import mongoose from "mongoose";

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

const createboardtableSchema = async (req, res) => {
  try {
    const { schemaName, columns, NumberOfValueslist } = req.body;

    const schemaFields = {};

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

    const DynamicModel = mongoose.model(schemaName, dynamicSchema);

    if (DynamicModel) {
      res
        .status(201)
        .json({ message: `Schema "${schemaName}" created successfully` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create schema" });
  }
};

export { createboardtableSchema, updateNumberOfValues };
