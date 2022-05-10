export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
  return UserModel;
};
