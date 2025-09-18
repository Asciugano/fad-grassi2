import sequelize from "@/lib/db";
import { DataTypes } from "sequelize";

const HomeWork = sequelize.define("homeworks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
  },
  files: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  deadline: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

export default HomeWork;
