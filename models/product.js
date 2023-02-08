// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false, //use auto increment
    //   primaryKey: true //set as primary key
      
      
    // },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL, //value is a decimal
        allowNull: false,
        
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10 //default value of 10
        
      },
      category_id: {
        type: DataTypes.INTEGER,
        //references category model's id
        references:{
          model:'Category',
          key:'id'
        }
      },
  
  },
  {
    sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: "Product",
  }
);

module.exports = Product;
