const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_vote', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    eventId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    isAgree: {
      type: DataTypes.ENUM('YES','NO'),
      allowNull: false
    },
    parentId: {
      type: DataTypes.STRING(0),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'event_vote',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
