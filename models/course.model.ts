import sequelize from "@/lib/db";
import { DataTypes } from "sequelize";

const Course = sequelize.define("courses", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: true,
});

export default Course;
