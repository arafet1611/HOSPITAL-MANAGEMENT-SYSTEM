import SchemaObjectModel from "../model/SchemaObjectModel.js";

export const getSchemaobjectsBySchemanameAndYear = async (req, res) => {
  const { schemaName } = req.params;
  const { year } = req.query;

  if (!schemaName || !year) {
    return res.status(400).json({ error: "schemaName and year are required" });
  }

  try {
    const regex = new RegExp(`/${year}$`);
    const schemaObjects = await SchemaObjectModel.find({
      schemaName,
      month: { $regex: regex },
    });
    res.json(schemaObjects);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
