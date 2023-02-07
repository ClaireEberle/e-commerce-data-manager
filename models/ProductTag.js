const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true
    //     //use auto increment
    //     //set as primary key
    //   },
      product_id: {
        type: DataTypes.INTEGER,
        references:{
          //references the product model;s id
        model:'Category',
        key:'id'
        }
      },
      tag_id: {
          type: DataTypes.INTEGER,
          //references the tag model's id
          references:{
            model:'Tag',
            key:'id'
          }
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
