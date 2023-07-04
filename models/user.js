module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define("users",{
        userId:{type:DataTypes.INTEGER,allowNull:false},
        userName:{type:DataTypes.STRING,allowNull:false},
        email:{type:DataTypes.STRING,allowNull:false},
        mobile:{type:DataTypes.INTEGER,allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false},
        companyId:{type:DataTypes.INTEGER,
            references:{
            model:"companies",
            key:"companyId",
            }
        }
    });
    return user;
}