module.exports = (sequelize,DataTypes)=>{
    const company = sequelize.define("companies",{
        companyId:{type:DataTypes.INTEGER,allowNull:false},
        companyName:{type:DataTypes.STRING,allowNull:false}
    });
    return company;
}