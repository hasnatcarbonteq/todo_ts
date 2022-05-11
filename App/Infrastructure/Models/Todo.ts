export default (sequelize, DataTypes) => {
  const TodoModel = sequelize.define(
    'Todo',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      }
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
  return TodoModel;
};
