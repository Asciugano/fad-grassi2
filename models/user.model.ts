import sequelize from "@/lib/db"
import { Role } from "@/lib/types";
import { DataTypes, Model } from "sequelize"

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: Role
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 255],
      is: {
        args: /^(?=.*[A-Z])(?=.*\d).+$/,
        msg: "La password defe contenere al meno una lettera maiuscola un numero",
      },
    },
  },
  role: {
    type: DataTypes.ENUM('studente', 'insegnante', 'admin'),
    allowNull: false,
  }
}, { timestamps: true, sequelize, modelName: "users" });

export default User;
