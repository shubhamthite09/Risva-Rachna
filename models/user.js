module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define("user",{
        userId:{type:DataTypes.INTEGER,allowNull:false},
        userName:{type:DataTypes.STRING,allowNull:false},
        email:{type:DataTypes.STRING,allowNull:false},
        mobile:{type:DataTypes.INTEGER,allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false},
        companyId:{type:DataTypes.INTEGER,
            references:{
            model:"company",
            key:"companyId",
            }
        }
    });
    return user;
}