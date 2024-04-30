import mongoose from "mongoose";

const SchemaObjectSchema = new mongoose.Schema({
  schemaName: {
    type: String,
    required: true,
  },
  schemaObject: {
    type: Object,
    required: true,
  },
});

const SchemaObjectModel = mongoose.model("SchemaObject", SchemaObjectSchema);
export default SchemaObjectModel;
