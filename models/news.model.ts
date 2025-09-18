import sequelize from "@/lib/db";
import { DataTypes } from "sequelize";

const News = sequelize.define("news", {
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
  }
});

export default News;
