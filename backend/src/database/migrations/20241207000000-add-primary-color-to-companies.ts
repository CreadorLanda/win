import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Companies", "primaryColor", {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#2DDD7F"
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Companies", "primaryColor");
  }
};