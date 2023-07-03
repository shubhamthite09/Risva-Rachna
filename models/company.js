module.exports = (sequelize,DataTypes)=>{
    const company = sequelize.define("company",{
        companyId:{type:DataTypes.INTEGER,allowNull:false},
        companyName:{type:DataTypes.STRING,allowNull:false}
    });
    return company;
}