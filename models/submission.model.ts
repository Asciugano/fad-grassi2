import sequelize from "@/lib/db";
import { DataTypes } from "sequelize";

const Submission = sequelize.define("submissions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  files: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
}, {
  timestamps: true,
});

export default Submission;
